import {PrimaryColumn} from "typeorm";

export class Email {
  @PrimaryColumn({length: 64})
  localPart: string;
  @PrimaryColumn({length: 255})
  domain: string;
  private static readonly DELIMITER = "@";

  constructor(email?: string) {
    if (email) {
      [this.localPart, this.domain] = this.tokenize(email);
    }
  }

  private tokenize(email: string): string[] {
    return email.split(Email.DELIMITER);
  }

  public sendTo(transporter: any, contents: string): Promise<boolean> {
    return transporter.sendMail({
      from: process.env.MIAL_SENDER!,
      to: this.asFormat(),
      subject: "✔ Snug confirmation link",
      html: contents
    });
  }

  asFormat(): string {
    return this.localPart + Email.DELIMITER + this.domain;
  }
}