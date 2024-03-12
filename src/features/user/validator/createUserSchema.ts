import { z } from "zod";
import { ExpressHandlerType } from "../../_shared/types";
import { parseZodObjectOrThrow } from "../../_shared/functions/parseZodObjectOrThrow";

export const createUserSchema = z
  .object({
    name: z.string(),
    surname: z.string(),
    age: z.number().nonnegative(),
    email: z.string().email(),
  })
  .strict();
// Strict ensures it accepts only these properties and nothing more or less

export const createUserSchemaValidator: ExpressHandlerType = (req, _res, next) => {
  try {
    parseZodObjectOrThrow(createUserSchema, req.body);
    next();
  } catch (err) {
    return next(err);
  }
};
