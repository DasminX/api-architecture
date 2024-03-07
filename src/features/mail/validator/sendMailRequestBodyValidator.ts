import { z } from "zod";
import { ExpressHandlerType } from "../../_shared/types";
import { parseZodObjectOrThrow } from "../../_shared/functions/parseZodObjectOrThrow";

export const sendMailRequestBody = z
  .object({
    sender: z.string().email(),
    content: z.string().min(30, {
      message: "Please, enter more details (min content 30 characters length)",
    }),
    subject: z.string().min(5),
  })
  .strict();
// Strict ensures it accepts only these properties and nothing more or less

export const sendMailRequestBodyValidator: ExpressHandlerType = (
  req,
  _res,
  next
) => {
  try {
    parseZodObjectOrThrow(sendMailRequestBody, req.body);
    next();
  } catch (err) {
    return next(err);
  }
};

// Type based on Zod object
export type sendMailRequestBodyT = typeof sendMailRequestBody;
export type SendMailRequestBodyTInfer = z.infer<typeof sendMailRequestBody>;
