import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import { notFoundController } from "./features/_shared/controller/notFound.controller";
import { errorController } from "./features/_shared/controller/error.controller";
import { MailRoute } from "./features/mail/route/mail.route";

export class App {
  public readonly app;

  constructor(private readonly mailRoute: MailRoute) {
    this.app = express();
    this._setProtection();
    this._setLogger();
    this._setRequestRelatedOpts();
    this._setHandlers();
  }

  private _setProtection() {
    this.app.options("*", cors());
    this.app.use(helmet());
  }

  private _setLogger() {
    let morganMode = "combined";
    if (process.env.NODE_ENV === "development") {
      morganMode = "dev";
    }
    this.app.use(morgan(morganMode));
  }

  private _setRequestRelatedOpts() {
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(compression());
  }

  private _setHandlers() {
    this.app.use("/api/mail", this.mailRoute.router);

    this.app.all("*", notFoundController);

    this.app.use(errorController);
  }
}
