import { ExpressHandlerType } from "../../_shared/types";
import { MailServiceI } from "../service/abstraction";

export type MailControllerIDeps = { mailService: MailServiceI<any> };

export abstract class MailControllerI {
  protected readonly mailService: MailServiceI<any>;

  constructor({ mailService }: MailControllerIDeps) {
    this.mailService = mailService;
  }

  public abstract sendMail: ExpressHandlerType;
}
