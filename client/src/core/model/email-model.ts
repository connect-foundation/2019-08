export class EmailModel {
  private static readonly DELIMITER = "@";
  private static readonly DEFAULT_EMAIL = "";
  private localPart: string;
  private domain: string;
  private readonly id: number;

  constructor(id: number, email?: string) {
    this.id = id;
    [this.localPart, this.domain] = this.tokenize(email || EmailModel.DEFAULT_EMAIL);
  }

  private tokenize(email: string): string[] {
    return email.split(EmailModel.DELIMITER);
  }

  public changeEmail(email: string): EmailModel {
    [this.localPart, this.domain] = this.tokenize(email);
    return this;
  }

  public getId() {
    return this.id;
  }
}