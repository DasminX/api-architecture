import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/appError";

export const notFoundController = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};
