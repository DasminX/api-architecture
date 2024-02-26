import { InternalError } from "../../../errors/appError";
import { NodemailerService } from "../service/mail/concrete-nodemailer";
import { MailServiceI } from "../service/mail/abstraction";
import { sendMailRequestBody } from "../model/sendMailRequestBody.model";
import { parseZodObjectOrThrow } from "../../_shared/functions/parseZodObjectOrThrow";
import { ExpressHandlerType } from "../../_shared/types";

export abstract class MailControllerI {
  protected readonly mailService: MailServiceI<any>;

  constructor({ mailService }: { mailService: MailServiceI<any> }) {
    this.mailService = mailService;
  }

  public abstract sendMail: ExpressHandlerType;
}

export class NodemailerController extends MailControllerI {
  constructor({ mailService }: { mailService: NodemailerService }) {
    super({ mailService });
  }

  /* Arrow function method - workaround in losing "this" context when it's called */
  public sendMail: ExpressHandlerType = async (req, res, next) => {
    try {
      const credentials = parseZodObjectOrThrow(sendMailRequestBody, req.body);

      const sendMailResult = await this.mailService.sendMail(credentials);

      if (!sendMailResult.success) {
        throw new InternalError(sendMailResult.error); // Error in nodemailer
      }

      return res.json(sendMailResult);
    } catch (err) {
      return next(err);
    }
  };
}
