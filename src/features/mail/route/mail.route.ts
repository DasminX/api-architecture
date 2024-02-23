import express, { Router } from "express";
import { type MailControllerI } from "../controller/mail.controller";

export class MailRoute {
  public readonly router: Router;

  constructor(private readonly _mailController: MailControllerI) {
    this.router = express.Router();
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this.router.post("/send", this._mailController.sendMail);
  }
}
