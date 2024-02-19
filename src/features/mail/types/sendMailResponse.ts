export type SendMailResponseT =
  | { success: true }
  | { success: false; error: string };
