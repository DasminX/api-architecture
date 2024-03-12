import express, { Router } from "express";
import { MailControllerI } from "../controller/abstraction";
import { ExpressHandlerType } from "../../_shared/types";

type MailRouteDeps = {
  mailController: MailControllerI;
  sendMailSchemaValidator: ExpressHandlerType;
};

export class MailRoute {
  public readonly router: Router;
  private readonly mailController: MailControllerI;
  private readonly sendMailSchemaValidator: ExpressHandlerType;

  constructor(routeDeps: MailRouteDeps) {
    this.mailController = routeDeps.mailController;
    this.sendMailSchemaValidator = routeDeps.sendMailSchemaValidator;

    this.router = express.Router();
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this.router.post("/send", this.sendMailSchemaValidator, this.mailController.sendMail);
  }
}
