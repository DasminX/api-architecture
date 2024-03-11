import { APIResponseSuccess } from "./../../_shared/response/APIResponse";
import { InternalError } from "../../../errors";
import { ExpressHandlerType } from "../../_shared/types";
import { MailControllerI, MailControllerIDeps } from "./abstraction";

export class NodemailerController extends MailControllerI {
  constructor({ mailService }: MailControllerIDeps) {
    super({ mailService });
  }

  /* Arrow function method - workaround in losing "this" context when it's called */
  public sendMail: ExpressHandlerType = async (req, res, next) => {
    try {
      const sendMailResult = await this.mailService.sendMail(req.body);

      if (!sendMailResult.delivered) {
        throw new InternalError(sendMailResult.errorMessage); // Error in nodemailer
      }

      return res.json(new APIResponseSuccess(sendMailResult));
    } catch (err) {
      return next(err);
    }
  };
}
