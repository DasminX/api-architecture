import { InternalError } from "../../../utils/errors";
import { NodemailerService } from "../service/mail/nodemailer.service";
import { parseZodObjectOrThrow } from "../../_shared/functions/parseZodObjectOrThrow";
import { ExpressHandlerType } from "../../_shared/types";
import {
  SendMailRequestBodyTInfer,
  sendMailRequestBodyT,
} from "../model/sendMailRequestBody.model";
import { SendMailResponse } from "../service/mail/responses";
import { MailControllerI } from "./abstraction";

export class NodemailerController extends MailControllerI {
  private readonly sendMailRequestBody: sendMailRequestBodyT;
  constructor({
    mailService,
    sendMailRequestBody,
  }: {
    mailService: NodemailerService;
    sendMailRequestBody: sendMailRequestBodyT;
  }) {
    super({ mailService });
    this.sendMailRequestBody = sendMailRequestBody;
  }

  /* Arrow function method - workaround in losing "this" context when it's called */
  public sendMail: ExpressHandlerType = async (req, res, next) => {
    try {
      const credentials: SendMailRequestBodyTInfer = parseZodObjectOrThrow(
        this.sendMailRequestBody,
        req.body
      );

      const sendMailResult: SendMailResponse = await this.mailService.sendMail(
        credentials
      );

      if (!sendMailResult.success) {
        throw new InternalError(sendMailResult.error); // Error in nodemailer
      }

      return res.json(sendMailResult);
    } catch (err) {
      return next(err);
    }
  };
}
