import { AppError } from "../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { MailService } from "../service/mail/concrete";
import { sendMailRequestBodyModel } from "../model/sendMailRequestBody.model";
import { formatZodErrorIssues } from "../../_shared/functions/formatZodErrorIssues";

export interface MailControllerI {
  sendMail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response>;
}

export class MailController implements MailControllerI {
  constructor(private readonly _mailService: MailService) {}

  public async sendMail(req: Request, res: Response, next: NextFunction) {
    const validationResult = sendMailRequestBodyModel.safeParse(req.body);

    if (!validationResult.success) {
      return next(
        new AppError(formatZodErrorIssues(validationResult.error.issues), 400)
      );
      /* TODO: consider AppError instances, e.g. ValidationError extends AppError... */
    }

    const sendMailResult = await this._mailService.sendMail(
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
