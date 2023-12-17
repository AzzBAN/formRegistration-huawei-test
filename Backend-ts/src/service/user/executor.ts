import log from "loglevel";
import { SequelizeMySQLClient, User } from "../../infrastructure/db";
import { UserError, responseType } from "../../utils/res";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { promises } from "dns";

export class UserExecutor {
  db: SequelizeMySQLClient;
  saltRounds: number = 10;
  jwtHash: string;

  constructor(db: SequelizeMySQLClient) {
    this.db = db;
    this.jwtHash = process.env.APP_JWT_SECRET || "";
    if (this.jwtHash === "") {
      throw new ReferenceError("undefined APP_JWT_SECRET environment variable");
    }
  }

  async authenticate(email: string, password: string): Promise<responseType> {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser === null) {
      return new responseType("Missmatched Email / Password", 400, "");
    }

    // Check password
    const matchedPassword = bcrypt.compareSync(password, existingUser.password);
    if (!matchedPassword) {
      return new responseType("Wrong Password", 400, "");
    }
    const payloadData = {
      userID: existingUser.id,
    };

    const token = jwt.sign(payloadData, this.jwtHash, {
      expiresIn: "1 day",
    });

    const data = {
      user: {
        id: existingUser.id,
        name: existingUser.name,
        phone_number: existingUser.phone_number,
        email: existingUser.email,
      },
      token: token,
    };

    return new responseType("Login Berhasil", 200, data);
  }

  async register(name: string, email: string, phone_number: string, password: string): Promise<responseType> {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser !== null) {
      return new responseType("Email sudah digunakan", 400, "");
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, this.saltRounds);

    // Save user
    const newUser = User.build({
      name: name,
      email: email,
      phone_number: phone_number,
      password: hashedPassword,
    });
    await newUser.save();

    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone_number: newUser.phone_number,
    };
    return new responseType("Registrasi berhasi", 201, userWithoutPassword);
  }
}
