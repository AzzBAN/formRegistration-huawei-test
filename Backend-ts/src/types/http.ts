import { Router } from "express";

export interface HTTPConnector {
  router: Router;
  registerRoutes: () => void;
}
