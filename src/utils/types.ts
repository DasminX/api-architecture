import { MailRoute } from "../features/mail/route/mail.route";
import { UserRoute } from "../features/user/route/user.route";

export type AppDependencies = {
  mailRoute: MailRoute;
  userRoute: UserRoute;
};
