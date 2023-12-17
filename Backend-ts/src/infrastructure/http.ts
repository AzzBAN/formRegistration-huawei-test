import express, { Express, NextFunction, Request, Response, Router } from "express";
import cors from "cors";
import { UserError } from "../utils/res";
export function InitExpress() {
  return new ExpressServer();
}

export class ExpressServer {
  app: Express;

  urlAllowed = ["http://127.0.0.1:5500"];
  constructor() {
    this.app = express();
    this.app.get("/", (req: Request, res: Response) => {
      return res.redirect("https://google.com");
    });
    this.app.get("/__ping", (req: Request, res: Response) => {
      res.send("pong");
    });
    this.app.get("/__error", async (req: Request, res: Response) => {
      throw new UserError("Bro ini error");
    });
    this.app.use(
      cors({
        origin: this.urlAllowed,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 204,
      })
    );
  }

  start() {
    const port = parseInt(process.env.APP_PORT || "3000");
    const host = process.env.APP_HOST || "127.0.0.1";
    this.app.listen(port, host, () => {
      console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
    });
  }

  registerRouter(router: Router) {
    this.app.use(router);
  }
}
