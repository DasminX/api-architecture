import { NodemailerController } from "./features/mail/controller/mail.controller";
import { MailRoute } from "./features/mail/route/mail.route";
import { NodemailerService } from "./features/mail/service/mail/concrete-nodemailer";

export const getMailRouteAndInjectDependencies = (): MailRoute => {
  const mailSerivice = new NodemailerService();
  const mailController = new NodemailerController(mailSerivice);
  const mailRoute = new MailRoute(mailController);

  return mailRoute;
};
