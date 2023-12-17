import { Request, Response, Router } from "express";
import { UserExecutor } from "./executor";
import { ValidationError, date, object, string } from "yup";
import bodyParser from "body-parser";
import { UserError, responseType } from "../../utils/res";
import log from "loglevel";
import { HTTPConnector } from "../../types/http";

export class UserHTTPConnector implements HTTPConnector {
  executor: UserExecutor;
  router: Router;

  constructor(executor: UserExecutor) {
    this.executor = executor;
    this.router = Router();
    this.registerRoutes();
  }
  registerRoutes() {
    this.register = this.register.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.router.post("/user/auth", bodyParser.json(), this.authenticate);
    this.router.post("/users", bodyParser.json(), this.register);
  }

  getRouter() {
    return this.router;
  }

  async authenticate(req: Request, res: Response) {
    const requestSchema = object({
      email: string().email().required(),
      password: string().min(8).required(),
    });

    const requestPayload = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      requestSchema.validateSync(requestPayload);
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).send(new responseType(err.message, 400, ""));
      }
    }

    const data = await this.executor.authenticate(requestPayload.email, requestPayload.password);
    res.status(data.status).send(data);
    log.info(data.message);
  }

  async register(req: Request, res: Response) {
    const requestSchema = object({
      name: string().required(),
      email: string().email().required(),
      phone_number: string().min(12).required(),
      password: string().min(8).required(),
    });
    const requestPayload = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: req.body.password,
    };
    try {
      requestSchema.validateSync(requestPayload);
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).send(new responseType(err.message, 400, err));
      }
    }
    const data = await this.executor.register(requestPayload.name, requestPayload.email, requestPayload.phone_number, requestPayload.password);
    res.status(data.status).send(data);
    log.info(data.message);
  }
}
