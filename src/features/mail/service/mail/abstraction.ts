import { SendMailResponse } from "./responses";

export interface MailOptions {
  sender: string;
  content: string;
  subject: string;
}

export abstract class MailServiceI<T extends any> {
  abstract sendMail(options: MailOptions): Promise<SendMailResponse>;
  protected createTransport(): T {
    throw new Error(
      "It's only an abstraction! You must implement this method by yourself!"
    );
  }
}
