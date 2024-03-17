import { notFoundController } from "./features/_shared/controller/notFound.controller";
import { errorController } from "./features/_shared/controller/error.controller";
import { AwilixContainer, InjectionMode, asClass, asValue, createContainer } from "awilix";
import { App } from "./app";
import { injectMailContainerDependencies } from "./features/mail/mailContainer";
import { injectUserContainerDependencies } from "./features/user/userContainer";
import { injectDBContainerDependencies } from "./db/dbContainer";

export const createAwilixContainer = (): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  injectDBContainerDependencies(container);
  injectMailContainerDependencies(container);
  injectUserContainerDependencies(container);

  container.register({
    notFoundController: asValue(notFoundController),
    errorController: asValue(errorController),
    appEntry: asClass(App).singleton(),
  });

  return container;
};
