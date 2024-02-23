import { Transporter, createTransport } from "nodemailer";

export abstract class TransporterServiceI<T extends any> {
  protected _createTransport(): T {
    throw new Error("Not implemented!");
  }
}

export class TransporterService extends TransporterServiceI<Transporter> {
  public transporter: Transporter = this._createTransport();

  protected _createTransport() {
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
