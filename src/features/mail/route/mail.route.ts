import express from "express";
import { MailController } from "../controller/mail.controller";
import { MailService } from "../service/mail.service";
import { TransporterService } from "../service/transporter.service";

const mailController = new MailController(
  new MailService(new TransporterService())
);

const router = express.Router();

router.post("/send", mailController.sendMail);

export default router;
