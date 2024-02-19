import express from "express";
import mailController from "../controller/mail.controller";

const router = express.Router();

router.post("/send", mailController.sendMail);

export default router;
