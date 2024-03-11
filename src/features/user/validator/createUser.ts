import { z } from "zod";
import { ExpressHandlerType } from "../../_shared/types";
import { parseZodObjectOrThrow } from "../../_shared/functions/parseZodObjectOrThrow";

export const createUser = z
  .object({
    name: z.string(),
    surname: z.string(),
    age: z.number().nonnegative(),
    email: z.string().email(),
  })
  .strict();
// Strict ensures it accepts only these properties and nothing more or less

export const createUserValidator: ExpressHandlerType = (req, _res, next) => {
  try {
    parseZodObjectOrThrow(createUser, req.body);
    next();
  } catch (err) {
    return next(err);
  }
};

// Type based on Zod object
export type createUserT = typeof createUser;
export type createUserTInfer = z.infer<typeof createUser>;
