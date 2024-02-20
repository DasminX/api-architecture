import { AppError } from "../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { MailService } from "../service/mail.service";
import { sendMailRequestBodyModel } from "../model/sendMailRequestBody.model";
import { formatZodErrorIssues } from "../../_shared/functions/formatZodErrorIssues";

export class MailController {
  public static async sendMail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // Check incoming request body to fit the shape of model (sendMailRequestBodyModel)
    const validationResult = sendMailRequestBodyModel.safeParse(req.body);

    // Request body doesn't fit shape of Zod object
    if (!validationResult.success) {
      return next(
        new AppError(formatZodErrorIssues(validationResult.error.issues), 400)
      );
      /* TODO: consider AppError instances, e.g. ValidationError extends AppError... */
    }

    // Create or return instance of MailService singleton and call sendMail method on it
    const sendMailResult = await MailService.getInstance().sendMail(
      validationResult.data
    );

    // Error in nodemailer
    if (!sendMailResult.success) {
      return next(new AppError(sendMailResult.error, 500));
      /* TODO: InternalError, MailError ? */
    }

    return res.json(sendMailResult);
  }
}

/* Considerations */
// You could check if it is somehow possible to make it so that you get mailService as a function parameter, so that the code does not strictly depend on the MailService class,
// but was injected through the constructor (Once again, Dependency Injection and Inversion of Control are at odds),
// which would greatly simplify testing
