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
    console.log("wchodzi");
    return createTransport({
      host: "random-host",
      port: 1234,
      secure: true,
      auth: {
        user: "some-user",
        pass: "some-password",
      },
    });
  }

  public async sendMail(options: MailOptions): Promise<SendMailResponse> {
    try {
      await this.transporter.sendMail({
        from: options.sender,
        to: "host-mail@exampleabc.com",
        subject: options.subject,
        text: options.content,
      });

      return new SendMailResponseSuccess();
    } catch (error) {
      return new SendMailResponseFail(error);
    }
  }
}
