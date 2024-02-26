import { AppError } from "../../../errors/appError";
import { NextFunction, Request, Response } from "express";
import { formatZodErrorIssues } from "../../_shared/functions/formatZodErrorIssues";
import { NodemailerService } from "../service/mail/concrete-nodemailer";
import { MailServiceI } from "../service/mail/abstraction";
import { sendMailRequestBody } from "../model/sendMailRequestBody.model";
import { parseZodObjectOrThrow } from "../../_shared/functions/parseZodObjectOrThrow";

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
    try {
      const credentials = parseZodObjectOrThrow(sendMailRequestBody, req.body);

      const sendMailResult = await this.mailService.sendMail(credentials);

      // Error in nodemailer
      if (!sendMailResult.success) {
        return next(new AppError(sendMailResult.error, 500));
        /* TODO: InternalError, MailError ? */
      }

      return res.json(sendMailResult);
    } catch (err) {
      return next(err);
    }
  };
}
