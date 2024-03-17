import { AwilixContainer, asValue } from "awilix";
import { dataSource } from "./dataSource";

export const injectDBContainerDependencies = (container: AwilixContainer) => {
  container.register({
    dataSource: asValue(dataSource),
  });
};
