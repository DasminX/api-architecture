import { Transporter, createTransport } from "nodemailer";

export class TransporterService {
  public transporter: Transporter = this._createTransport();

  private _createTransport() {
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
}
