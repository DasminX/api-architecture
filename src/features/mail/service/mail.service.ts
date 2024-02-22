import { SendMailRequestBodyModelT } from "../model/sendMailRequestBody.model";
import { SendMailResponseT } from "../types/sendMailResponse";
import { TransporterService } from "./transporter.service";

// Interface for MailService - when testing, just make an object like this interface and substitute.
export interface IMailService {
  sendMail(credentials: SendMailRequestBodyModelT): Promise<SendMailResponseT>;
}

export class MailService implements IMailService {
  constructor(private readonly transporterService: TransporterService) {}

  public async sendMail({
    sender,
    content,
    subject,
  }: SendMailRequestBodyModelT): Promise<SendMailResponseT> {
    try {
      await this.transporterService.transporter.sendMail({
        from: sender,
        to: "host-mail@exampleabc.com",
        subject: subject,
        text: content,
      });

      return { success: true };
    } catch (_e) {
      return { success: false, error: "Something went wrong!" };
    }
  }
}

/* Considerations */
// You can still think how you can more isolate the service that sends emails (MailService class) from the functions, objects, methods associated with the Nodemailer itself.
// That is, create a separate class that will be such an "adapter" between the nodemailer library and what kind of data shape you want in the MailService class itself.
// Then, if the nodemailer implementation changes with some version, you won't have to change this sendMail class, because it will get
// from the adapter such data that you implement in the adapter interface - then you just send the data to the "mailTransporterAdapter" object that you create,
// and it returns to you the data shape you want.
// This is easier because you don't have to rely on an external library for unit testing, and by implementing the interface you can easily substitute it,
// which will be much faster to test (nodemailer uses async requests with an external server, among other things).

// In addition, you can also think about Dependency Injection with Inversion of Control - then no class/object depends on others - that is, you get in the constructor of the
// object right away. I don't know if it would work here specifically, but as if you added the Adapter I described above, it would make sense.
