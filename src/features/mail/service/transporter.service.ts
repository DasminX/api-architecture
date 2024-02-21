import { Transporter } from "nodemailer";

export class TransporterService {
  constructor(public readonly transporter: Transporter) {}
}
