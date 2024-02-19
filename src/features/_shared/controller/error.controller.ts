import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/appError";

export const errorController = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response<JSON> => {
  return res.json({
    status: err.status,
    code: err.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

/* TODO: consider more flexible reponse, maybe call some instances of errors? */
