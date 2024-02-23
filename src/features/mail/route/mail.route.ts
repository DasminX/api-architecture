import express, { Router } from "express";
import { type MailControllerI } from "../controller/mail.controller";

export class MailRoute {
  private _router: Router;

  constructor(private readonly _mailController: MailControllerI) {
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
