import express, { Router } from "express";
import { MailControllerI } from "../controller/abstraction";
import { ExpressHandlerType } from "../../_shared/types";
import { MailRouteDependencies } from "../types";

export class MailRoute {
  public readonly router: Router;
  private readonly mailController: MailControllerI;
  private readonly sendMailRequestBodyValidator: ExpressHandlerType;

  constructor(routeDeps: MailRouteDependencies) {
    this.mailController = routeDeps.mailController;
    this.sendMailRequestBodyValidator = routeDeps.sendMailRequestBodyValidator;

    this.router = express.Router();
    this._applyRoutesHandlers();
  }

  // TODO: add validation middleware with validator
  private _applyRoutesHandlers() {
    this.router.post(
      "/send",
      this.sendMailRequestBodyValidator,
      this.mailController.sendMail
    );
  }
}
