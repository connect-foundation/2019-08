import jwt from "jsonwebtoken";

export abstract class Token<T extends object> {
  public abstract parsePayloadBy(base: T): object;

  public tokenize(base: T): string {
    const payload = this.parsePayloadBy(base);
    return jwt.sign(payload, process.env.SECRET_KEY);
  };
}