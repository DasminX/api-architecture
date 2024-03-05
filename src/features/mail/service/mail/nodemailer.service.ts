import { Transporter, createTransport } from "nodemailer";
import { MailServiceI, MailOptions } from "./abstraction";
import {
  SendMailResponse,
  SendMailResponseFail,
  SendMailResponseSuccess,
} from "./responses";

export class NodemailerService extends MailServiceI<Transporter> {
  public readonly transporter: Transporter = this.createTransport();

  protected createTransport() {
    return createTransport({
      host: "mailcatcher",
      port: 1025,
      secure: false,
    });
  }

  public async sendMail(options: MailOptions): Promise<SendMailResponse> {
    try {
      await this.transporter.sendMail({
        from: options.sender,
        to: "test.receiver@mailcatcher.xd",
        subject: options.subject,
        text: options.content,
      });

      return new SendMailResponseSuccess();
    } catch (error) {
      return new SendMailResponseFail(error);
    }
  }
}
