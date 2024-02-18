import { AppError } from "./../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { MailService } from "../service/mailService";
import { SendMailRequestBody } from "../model/sendMailRequestBody";
import { formatZodError } from "../../_shared/functions/formatZodError";

export const sendMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check incoming request body to fit the shape of model (sendMailRequestBody)
  const validationResult = SendMailRequestBody.safeParse(req.body);

  // Request body doesn't fit shape of Zod object
  if (!validationResult.success) {
    return next(
      new AppError(formatZodError(validationResult.error.issues), 400)
    );
  }

  // Create or return instance of MailService singleton
  const mailService = MailService.getInstance();

  // Invoke sendMail method on mailService
  const sendMailResult = await mailService.sendMail(validationResult.data);

  // Error in nodemailer
  if (!sendMailResult.success) {
    return next(new AppError(sendMailResult.error, 500));
  }

  return res.json(sendMailResult);
};

export default { sendMail };

/* Considerations */
// You could check if it is somehow possible to make it so that you get mailService as a function parameter, so that the code does not strictly depend on the MailService class,
// but was injected through the constructor (Once again, Dependency Injection and Inversion of Control are at odds),
// which would greatly simplify testing
