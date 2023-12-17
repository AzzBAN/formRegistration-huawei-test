import log from "loglevel";
import { Sequelize, DataTypes, Model } from "sequelize";
import { SequelizeMySQLClient } from "../types/db";

export class User extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare phone_number: string;
  declare password: string;
}

async function InitDBClient(): Promise<SequelizeMySQLClient> {
  log.info("Creating Database Client");

  const db = new Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: (msg) => log.debug(`db: ${msg}`),
  });

  await User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      timestamps: true,
    }
  ).sync({ alter: { drop: false } });

  return db;
}

export { InitDBClient, SequelizeMySQLClient };
