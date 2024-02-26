import { Response } from "express";
import { ExpressErrorHandlerType } from "../types";

export const errorController: ExpressErrorHandlerType = (
  err,
  _,
  res,
  __
): Response<JSON> => {
  return res.json({
    status: err.status,
    code: err.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
