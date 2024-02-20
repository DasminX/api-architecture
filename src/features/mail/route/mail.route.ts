import express from "express";
import { MailController } from "../controller/mail.controller";

const router = express.Router();

router.post("/send", MailController.sendMail);

export default router;
