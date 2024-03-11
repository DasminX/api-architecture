import { Response } from "express";
import { ExpressErrorHandlerType } from "../types";
import { APIResponseFail } from "../response/APIResponse";

export const errorController: ExpressErrorHandlerType = (
  err,
  _,
  res,
  __
): Response<JSON> =>
  res.json(
    new APIResponseFail({
      status: err.status,
      code: err.statusCode,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    })
  );
