export type TSendMailResponse =
  | { success: true }
  | { success: false; error: string };
