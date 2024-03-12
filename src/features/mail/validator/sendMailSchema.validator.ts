import { z } from "zod";
import { ExpressHandlerType } from "../../_shared/types";
import { parseZodObjectOrThrow } from "../../_shared/functions/parseZodObjectOrThrow";

export const sendMailSchema = z
  .object({
    sender: z.string().email(),
    content: z.string().min(30, {
      message: "Please, enter more details (min content 30 characters length)",
    }),
    subject: z.string().min(5),
  })
  .strict();
// Strict ensures it accepts only these properties and nothing more or less

export const sendMailSchemaValidator: ExpressHandlerType = (req, _res, next) => {
  try {
    parseZodObjectOrThrow(sendMailSchema, req.body);
    next();
  } catch (err) {
    return next(err);
  }
};
