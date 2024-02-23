export interface MailOptions {
  sender: string;
  content: string;
  subject: string;
}

export interface IMailService {
  sendMail(options: MailOptions): Promise<unknown>;
}
