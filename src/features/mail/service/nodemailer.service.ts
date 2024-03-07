import { Transporter, createTransport } from "nodemailer";
import { MailServiceI, MailOptions } from "./abstraction";
import {
  SendMailResponseDto,
  SendMailResponseFailDto,
  SendMailResponseSuccessDto,
} from "../dto/sendMailResponse.dto";

export class NodemailerService extends MailServiceI<Transporter> {
  public readonly transporter: Transporter = this.createTransport();

  protected createTransport() {
    return createTransport({
      host: process.env.NODEMAILER_HOST,
      port: Number(process.env.NODEMAILER_PORT) || 1025,
      secure: false,
    });
  }

  public async sendMail(options: MailOptions): Promise<SendMailResponseDto> {
    try {
      await this.transporter.sendMail({
        from: options.sender,
        to: "test.receiver@mailcatcher.xd",
        subject: options.subject,
        text: options.content,
      });

      return new SendMailResponseSuccessDto();
    } catch (error) {
      return new SendMailResponseFailDto(error);
    }
  }
}
