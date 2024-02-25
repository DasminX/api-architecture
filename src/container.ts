import {
  AwilixContainer,
  InjectionMode,
  asClass,
  createContainer,
} from "awilix";
import { MailRoute } from "./features/mail/route/mail.route";
import { NodemailerController } from "./features/mail/controller/mail.controller";
import { NodemailerService } from "./features/mail/service/mail/concrete-nodemailer";

export const createAwilixContainer = (): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  container.register({
    mailService: asClass(NodemailerService).singleton(),
    mailController: asClass(NodemailerController).singleton(),
    mailRoute: asClass(MailRoute).singleton(),
  });

  return container;
};
