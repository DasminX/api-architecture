import { AppError } from "../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { sendMailRequestBodyModel } from "../model/sendMailRequestBody.model";
import { formatZodErrorIssues } from "../../_shared/functions/formatZodErrorIssues";
import { NodemailerService } from "../service/mail/concrete-nodemailer";

export interface MailControllerI {
  sendMail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response>;
}

export class NodemailerController implements MailControllerI {
  constructor(private readonly _mailService: NodemailerService) {}

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
      sendMailResult;
      return next(new AppError(sendMailResult.error, 500));
      /* TODO: InternalError, MailError ? */
    }

    return res.json(sendMailResult);
  }
}
