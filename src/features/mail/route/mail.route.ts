import express, { Router } from "express";
import { MailControllerI } from "../controller/abstraction";

export class MailRoute {
  public readonly router: Router;
  private readonly mailController: MailControllerI;

  constructor({ mailController }: { mailController: MailControllerI }) {
    this.mailController = mailController;

    this.router = express.Router();
    this._applyRoutesHandlers();
  }

  private _applyRoutesHandlers() {
    this.router.post("/send", this.mailController.sendMail);
  }
}
