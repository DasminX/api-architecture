import express from "express";
import mailController from "../controller/mailController";

const router = express.Router();

router.post("/send-mail", mailController.sendMail);

export default router;
