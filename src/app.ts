import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import { AppError } from "./errors";
import { MailRoute } from "./features/mail/route/mail.route";
import { UserRoute } from "./features/user/route/user.route";
import {
  ExpressErrorHandlerType,
  ExpressHandlerType,
} from "./features/_shared/types";

type AppDeps = {
  mailRoute: MailRoute;
  userRoute: UserRoute;
  notFoundController: ExpressHandlerType;
  errorController: ExpressErrorHandlerType;
};

export class App {
  public readonly app;
  private readonly mailRoute: MailRoute;
  private readonly userRoute: UserRoute;
  private readonly notFoundController: ExpressHandlerType;
  private readonly errorController: ExpressErrorHandlerType;

  constructor(appDeps: AppDeps) {
    this.mailRoute = appDeps.mailRoute;
    this.userRoute = appDeps.userRoute;
    this.notFoundController = appDeps.notFoundController;
    this.errorController = appDeps.errorController;

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
    this.app.use("/api/users", this.userRoute.router);

    this.app.all("*", (req: Request, res: Response, next: NextFunction) =>
      this.notFoundController(req, res, next)
    );

    this.app.use(
      (err: AppError, req: Request, res: Response, next: NextFunction) =>
        this.errorController(err, req, res, next)
    );
  }
}
