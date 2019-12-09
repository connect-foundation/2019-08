import {PrimaryColumn} from "typeorm";
import {checkInvalidEmail} from "../../validator/email-validator";
import InvalidEmailException from "../../utils/exception/InvalidEmailException";
import {Transporter} from "nodemailer";
import TransferEmailException from "../../utils/exception/TransferEmailException";

export class Email {
  @PrimaryColumn({length: 64})
  private readonly localPart: string;
  @PrimaryColumn({length: 255})
  private readonly domain: string;
  private static readonly DELIMITER = "@";
  private contents: string;

  private constructor(localPart: string, domain: string) {
    this.localPart = localPart;
    this.domain = domain;
  }

  static build(email: string): Email {
    if (checkInvalidEmail(email)) {
      throw new InvalidEmailException("유효하지 않은 이메일 형식입니다");
    }

    const [localPart, domain] = Email.tokenize(email);
    return new Email(localPart, domain);
  }

  private static tokenize(email: string): string[] {
    return email.split(Email.DELIMITER);
  }

  public setUpContents(contents: string): void {
    this.contents = contents;
  }

  public sendTo(transporter: Transporter, sender: string): Promise<void> {
    return transporter.sendMail({
      from: sender,
      to: this.asFormat(),
      subject: "✔ Snug confirmation link",
      html: this.contents
    }).catch(this.handleTransferEmailError);
  }

  private handleTransferEmailError(error: Error): void {
    if (error) {
      throw new TransferEmailException(error.message);
    }
  }

  asFormat(): string {
    return this.localPart + Email.DELIMITER + this.domain;
  }

  asObject(): object {
    return {localPart: this.localPart, domain: this.domain};
  }
}