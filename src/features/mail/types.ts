import { ExpressHandlerType } from "../_shared/types";
import { MailControllerI } from "./controller/abstraction";

export type MailRouteDependencies = {
  mailController: MailControllerI;
  sendMailRequestBodyValidator: ExpressHandlerType;
};
