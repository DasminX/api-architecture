import { ExpressHandlerType } from "../../_shared/types";
import { MailServiceI } from "../service/abstraction";

export abstract class MailControllerI {
  protected readonly mailService: MailServiceI<any>;

  constructor({ mailService }: { mailService: MailServiceI<any> }) {
    this.mailService = mailService;
  }

  public abstract sendMail: ExpressHandlerType;
}
