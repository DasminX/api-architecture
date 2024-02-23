import { SendMailResponseT } from "../../types/sendMailResponse";
import { TransporterService } from "../transporter/concrete";
import { IMailService, MailOptions } from "./abstraction";

export class MailService implements IMailService {
  constructor(private readonly transporterService: TransporterService) {}

  public async sendMail(options: MailOptions): Promise<SendMailResponseT> {
    try {
      await this.transporterService.transporter.sendMail({
        from: options.sender,
        to: "host-mail@exampleabc.com",
        subject: options.subject,
        text: options.content,
      });

      return { success: true };
    } catch (_e) {
      return { success: false, error: "Something went wrong!" };
    }
  }
}
