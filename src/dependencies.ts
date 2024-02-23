import { MailController } from "./features/mail/controller/mail.controller";
import { MailRoute } from "./features/mail/route/mail.route";
import { MailService } from "./features/mail/service/mail/concrete";
import { TransporterService } from "./features/mail/service/transporter/concrete";

export const getMailRouteAndInjectDependencies = (): MailRoute => {
  const transporterService = new TransporterService();
  const mailSerivice = new MailService(transporterService);
  const mailController = new MailController(mailSerivice);
  return new MailRoute(mailController);
};
