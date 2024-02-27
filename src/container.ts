import {
  AwilixContainer,
  InjectionMode,
  asClass,
  asValue,
  createContainer,
} from "awilix";
import { MailRoute } from "./features/mail/route/mail.route";
import { NodemailerController } from "./features/mail/controller/mail.controller";
import { NodemailerService } from "./features/mail/service/mail/concrete-nodemailer";
import { sendMailRequestBody } from "./features/mail/model/sendMailRequestBody.model";
import { App } from "./app";

export const createAwilixContainer = (): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  container.register({
    sendMailRequestBody: asValue(sendMailRequestBody),
    mailService: asClass(NodemailerService).singleton(),
    mailController: asClass(NodemailerController).singleton(),
    mailRoute: asClass(MailRoute).singleton(),
    appEntry: asClass(App).singleton(),
  });

  return container;
};
