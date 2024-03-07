import { InternalError } from "../../../utils/errors";
import { NodemailerService } from "../service/nodemailer.service";
import { ExpressHandlerType } from "../../_shared/types";
import { MailControllerI } from "./abstraction";

export class NodemailerController extends MailControllerI {
  constructor({ mailService }: { mailService: NodemailerService }) {
    super({ mailService });
  }

  /* Arrow function method - workaround in losing "this" context when it's called */
  public sendMail: ExpressHandlerType = async (req, res, next) => {
    try {
      const sendMailResult = await this.mailService.sendMail(req.body);

      if (!sendMailResult.success) {
        throw new InternalError(sendMailResult.error); // Error in nodemailer
      }

      return res.json(sendMailResult);
    } catch (err) {
      return next(err);
    }
  };
}
