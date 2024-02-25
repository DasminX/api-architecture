import express, { Router } from "express";
import { type MailControllerI } from "../controller/mail.controller";

export class MailRoute {
  public readonly router: Router;
  private readonly mailController: MailControllerI;

  constructor({ mailController }: { mailController: MailControllerI }) {
    this.router = express.Router();
    this.mailController = mailController;
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this.router.post("/send", this.mailController.sendMail);
  }
}
