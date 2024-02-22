import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import mailRoute from "./dependencies";

import { notFoundController } from "./features/_shared/controller/notFound.controller";
import { errorController } from "./features/_shared/controller/error.controller";

export class App {
  private readonly _app;

  constructor() {
    this._app = express();

    this._setProtection();
    this._setLogger();
    this._setRequestRelatedOpts();
    this._setHandlers();
  }

  public get app() {
    return this._app;
  }

  private _setProtection() {
    this._app.options("*", cors());
    this._app.use(helmet());
  }

  private _setLogger() {
    let morganMode = "combined";
    if (process.env.NODE_ENV === "development") {
      morganMode = "dev";
    }
    this._app.use(morgan(morganMode));
  }

  private _setRequestRelatedOpts() {
    this._app.use(express.json({ limit: "10kb" }));
    this._app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this._app.use(compression());
  }

  private _setHandlers() {
    this._app.use("/api/mail", mailRoute.router);

    this._app.all("*", notFoundController);

    this._app.use(errorController);
  }
}
