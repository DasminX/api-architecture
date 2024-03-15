import { AwilixContainer, asClass, asValue } from "awilix";
import { NodemailerService } from "./service/nodemailer.service";
import { NodemailerController } from "./controller/mail.controller";
import { MailRoute } from "./route/mail.route";
import { sendMailSchemaValidator } from "./validator/sendMailSchema";

export const injectMailContainerDependencies = (container: AwilixContainer) => {
  container.register({
    mailService: asClass(NodemailerService).singleton(),
    mailController: asClass(NodemailerController).singleton(),
    sendMailSchemaValidator: asValue(sendMailSchemaValidator),
    mailRoute: asClass(MailRoute).singleton(),
  });
};
