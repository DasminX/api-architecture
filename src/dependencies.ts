import { NodemailerController } from "./features/mail/controller/mail.controller";
import { MailRoute } from "./features/mail/route/mail.route";
import { NodemailerService } from "./features/mail/service/mail/concrete-nodemailer";

/* TODO: other dependencies based on NODE_ENV/other things? */
export const getMailRouteAndInjectDependencies = (): MailRoute => {
  const mailService = new NodemailerService();
  const mailController = new NodemailerController(mailService);
  const mailRoute = new MailRoute(mailController);

  return mailRoute;
};
