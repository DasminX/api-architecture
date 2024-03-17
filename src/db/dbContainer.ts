import { AwilixContainer, asValue } from "awilix";
import { dataSource } from "./dataSource";

export const injectDBContainerDependencies = (container: AwilixContainer) => {
  if (process.env.NODE_ENV != "development") {
    container.register({
      dataSource: asValue(dataSource),
    });
  }
};
