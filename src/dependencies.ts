import { MailController } from "./features/mail/controller/mail.controller";
import { MailRoute } from "./features/mail/route/mail.route";
import { MailService } from "./features/mail/service/mail.service";
import { TransporterService } from "./features/mail/service/transporter.service";

const transporterService = new TransporterService();

const mailSerivice = new MailService(transporterService);

const mailController = new MailController(mailSerivice);

const mailRoute = new MailRoute(mailController);

export default mailRoute;
