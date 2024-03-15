import { z } from "zod";
import { ExpressHandlerType } from "../../_shared/types";
import { parseZodObjectOrThrow } from "../../_shared/functions/parseZodObjectOrThrow";

export const userSchema = z
  .object({
    name: z.string(),
    surname: z.string(),
    age: z.number().nonnegative(),
    email: z.string().email(),
  })
  .strict();
// Strict ensures it accepts only these properties and nothing more or less

export const userSchemaValidator: ExpressHandlerType = (req, _res, next) => {
  try {
    parseZodObjectOrThrow(userSchema, req.body);
    next();
  } catch (err) {
    return next(err);
  }
};
