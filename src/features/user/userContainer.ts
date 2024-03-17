import { AwilixContainer, asClass, asValue } from "awilix";
import { UserRoute } from "./route/user.route";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { InMemoryUserRepository } from "./repository/inMemory.repository";
import { userSchemaValidator } from "./validator/userSchema";
import { TypeormRepository } from "./repository/typeorm.repository";

export const injectUserContainerDependencies = (container: AwilixContainer) => {
  container.register({
    userRoute: asClass(UserRoute).singleton(),
    userController: asClass(UserController).singleton(),
    userService: asClass(UserService).singleton(),
    userSchemaValidator: asValue(userSchemaValidator),
    /*  */
    userRepository:
      process.env.NODE_ENV === "development"
        ? asClass(InMemoryUserRepository).singleton()
        : asClass(TypeormRepository).singleton(),
  });
};
