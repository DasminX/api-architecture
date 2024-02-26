import { AppError } from "../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { formatZodErrorIssues } from "../../_shared/functions/formatZodErrorIssues";
import { NodemailerService } from "../service/mail/concrete-nodemailer";
import { MailServiceI } from "../service/mail/abstraction";
import { sendMailRequestBody } from "../model/sendMailRequestBody.model";

export abstract class MailControllerI {
  protected readonly mailService: MailServiceI<any>;

  constructor({ mailService }: { mailService: MailServiceI<any> }) {
    this.mailService = mailService;
  }

  public abstract sendMail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response>;
}

export class NodemailerController extends MailControllerI {
  constructor({ mailService }: { mailService: NodemailerService }) {
    super({ mailService });
  }

  /* Arrow function method - workaround in losing "this" context when it's called */
  public sendMail = async (req: Request, res: Response, next: NextFunction) => {
    /* TODO: inject model into Awilix, also take it somewhere else to make controller clean */
    const validationResult = sendMailRequestBody.safeParse(req.body);

    if (!validationResult.success) {
      return next(
        new AppError(formatZodErrorIssues(validationResult.error.issues), 400)
      );
      /* TODO: consider AppError instances, e.g. ValidationError extends AppError... */
    }

    const sendMailResult = await this.mailService.sendMail(
      validationResult.data
    );

    // Error in nodemailer
    if (!sendMailResult.success) {
      sendMailResult;
      return next(new AppError(sendMailResult.error, 500));
      /* TODO: InternalError, MailError ? */
    }

    return res.json(sendMailResult);
  };
}
