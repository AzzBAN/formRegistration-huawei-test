import dotenv from "dotenv";
import log from "loglevel";
import { SetUpLog } from "./infrastructure/log";
import { InitExpress } from "./infrastructure/http";
import { InitDBClient } from "./infrastructure/db";
import { UserExecutor } from "./service/user/executor";
import { UserHTTPConnector } from "./service/user/http";

async function main() {
  log.info("Starting Application");

  SetUpLog();

  const express = InitExpress();

  const dbClient = await InitDBClient();

  const userExecute = new UserExecutor(dbClient);
  const userHTTP = new UserHTTPConnector(userExecute);

  express.registerRouter(userHTTP.getRouter());

  express.start();
}

main();
