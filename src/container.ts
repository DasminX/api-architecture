import {
  AwilixContainer,
  InjectionMode,
  asClass,
  asValue,
  createContainer,
} from "awilix";
import { MailRoute } from "./features/mail/route/mail.route";
import { NodemailerController } from "./features/mail/controller/mail.controller";
import { NodemailerService } from "./features/mail/service/mail/nodemailer.service";
import { sendMailRequestBody } from "./features/mail/model/sendMailRequestBody.model";
import { App } from "./app";
import { UserRoute } from "./features/user/route/user.route";
import { UserController } from "./features/user/controller/user.controller";
import { UserService } from "./features/user/service/user.service";
import { User } from "./features/user/model/User";

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

    userRoute: asClass(UserRoute).singleton(),
    userController: asClass(UserController).singleton(),
    userService: asClass(UserService).singleton(),
    userModel: asValue(User),
  });

  return container;
};
