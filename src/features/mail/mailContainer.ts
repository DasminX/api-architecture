import { AwilixContainer, asClass, asValue } from "awilix";
import { NodemailerService } from "./service/nodemailer.service";
import { NodemailerController } from "./controller/mail.controller";
import { MailRoute } from "./route/mail.route";
import { sendMailRequestBodyValidator } from "./validator/sendMailRequestBodyValidator";

export const injectMailContainerDependencies = (container: AwilixContainer) => {
  container.register({
    mailService: asClass(NodemailerService).singleton(),
    mailController: asClass(NodemailerController).singleton(),
    sendMailRequestBodyValidator: asValue(sendMailRequestBodyValidator),
    mailRoute: asClass(MailRoute).singleton(),
  });
};
