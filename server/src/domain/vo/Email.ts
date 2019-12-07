import {PrimaryColumn} from "typeorm";
import {checkInvalidEmail} from "../../validator/email-validator";
import InvalidEmailException from "../../utils/exception/InvalidEmailException";

export class Email {
  @PrimaryColumn({length: 64})
  private readonly localPart: string;
  @PrimaryColumn({length: 255})
  private readonly domain: string;
  private static readonly DELIMITER = "@";

  private constructor(localPart: string, domain: string) {
    this.localPart = localPart;
    this.domain = domain;
  }

  static build(email: string): Email {
    if(checkInvalidEmail(email)) {
      throw new InvalidEmailException("유효하지 않은 이메일 형식입니다");
    }

    const [localPart, domain] = Email.tokenize(email);
    return new Email(localPart, domain);
  }

  private static tokenize(email: string): string[] {
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

  asObject(): object {
    return {localPart: this.localPart, domain: this.domain};
  }
}