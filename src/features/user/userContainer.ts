import { AwilixContainer, asClass, asValue } from "awilix";
import { UserRoute } from "./route/user.route";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { User } from "./model/User";
import { InMemoryUserRepository } from "./repository/inMemory.repository";

export const injectUserContainerDependencies = (container: AwilixContainer) => {
  container.register({
    userRoute: asClass(UserRoute).singleton(),
    userController: asClass(UserController).singleton(),
    userService: asClass(UserService).singleton(),
    userRepository: asClass(InMemoryUserRepository).singleton(),
    userModel: asValue(User),
  });
};
