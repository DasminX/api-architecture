import {
  AwilixContainer,
  InjectionMode,
  asClass,
  createContainer,
} from "awilix";
import { App } from "./app";
import { injectMailContainerDependencies } from "./features/mail/mailContainer";
import { injectUserContainerDependencies } from "./features/user/userContainer";

export const createAwilixContainer = (): AwilixContainer => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  injectMailContainerDependencies(container);
  injectUserContainerDependencies(container);

  container.register({
    appEntry: asClass(App).singleton(),
  });

  return container;
};
