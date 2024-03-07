import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/errors";

export type ExpressHandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown;

export type ExpressErrorHandlerType = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown;
