import { z } from "zod";

// Shape of send-mail request body
export const SendMailRequestBody = z
  .object({
    sender: z.string().email(),
    content: z.string().min(30, {
      message: "Please, enter more details (min content 30 characters length)",
    }),
    subject: z.string().min(5),
  })
  .strict();
// Strict ensures it accepts only these properties and nothing more or less

// Type based on Zod object
export type TSendMailRequestBody = z.infer<typeof SendMailRequestBody>;
