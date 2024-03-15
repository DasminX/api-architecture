import { AwilixContainer, asClass, asValue } from "awilix";
import { UserRoute } from "./route/user.route";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { InMemoryUserRepository } from "./repository/inMemory.repository";
import { userSchemaValidator } from "./validator/userSchema";

export const injectUserContainerDependencies = (container: AwilixContainer) => {
  container.register({
    userRoute: asClass(UserRoute).singleton(),
    userController: asClass(UserController).singleton(),
    userService: asClass(UserService).singleton(),
    userRepository: asClass(InMemoryUserRepository).singleton(),
    userSchemaValidator: asValue(userSchemaValidator),
  });
};
