import { NotFoundError } from "../../../errors";
import { ExpressHandlerType } from "../types";

export const notFoundController: ExpressHandlerType = (req, _res, next) => {
  next(new NotFoundError(`${req.originalUrl} not found!`));
};
