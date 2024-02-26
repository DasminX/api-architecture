import { Request } from "express";
import { ZodObject, ZodRawShape } from "zod";
import { formatZodErrorIssues } from "./formatZodErrorIssues";
import { ValidationError } from "../../../errors/appError";

export const parseZodObjectOrThrow = <T extends ZodRawShape>(
  schema: ZodObject<T, "passthrough" | "strict" | "strip">,
  body: Request<Body>
) => {
  const parseResult = schema.safeParse(body);
  if (parseResult.success) {
    return parseResult.data;
  }

  throw new ValidationError(formatZodErrorIssues(parseResult.error.issues));
};
