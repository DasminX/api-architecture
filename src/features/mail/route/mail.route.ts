import express, { Router } from "express";
import { MailControllerI } from "../controller/abstraction";
import { ExpressHandlerType } from "../../_shared/types";

type MailRouteDeps = {
  mailController: MailControllerI;
  sendMailRequestBodyValidator: ExpressHandlerType;
};

export class MailRoute {
  public readonly router: Router;
  private readonly mailController: MailControllerI;
  private readonly sendMailRequestBodyValidator: ExpressHandlerType;

  constructor(routeDeps: MailRouteDeps) {
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
