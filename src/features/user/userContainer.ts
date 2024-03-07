import { AwilixContainer, asClass, asValue } from "awilix";
import { UserRoute } from "./route/user.route";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { User } from "./model/User";

export const injectUserContainerDependencies = (container: AwilixContainer) => {
  container.register({
    userRoute: asClass(UserRoute).singleton(),
    userController: asClass(UserController).singleton(),
    userService: asClass(UserService).singleton(),
    userModel: asValue(User),
  });
};
