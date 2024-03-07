import { AwilixContainer, asClass, asValue } from "awilix";
import { sendMailRequestBody } from "./model/sendMailRequestBody.model";
import { NodemailerService } from "./service/mail/nodemailer.service";
import { NodemailerController } from "./controller/mail.controller";
import { MailRoute } from "./route/mail.route";

export const injectMailContainerDependencies = (container: AwilixContainer) => {
  container.register({
    sendMailRequestBody: asValue(sendMailRequestBody),
    mailService: asClass(NodemailerService).singleton(),
    mailController: asClass(NodemailerController).singleton(),
    mailRoute: asClass(MailRoute).singleton(),
  });
};
