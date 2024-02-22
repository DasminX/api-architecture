import express, { Router } from "express";
import { MailController } from "../controller/mail.controller";

export class MailRoute {
  private _router: Router;

  constructor(private readonly _mailController: MailController) {
    this._router = express.Router();
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this._router.post("/send", this._mailController.sendMail);
  }

  public get router() {
    return this._router;
  }
}
