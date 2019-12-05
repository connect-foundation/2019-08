import { WebToken } from "core/entity/token";
export class JsonWebToken implements WebToken<string> {
  readonly token: string;
  constructor(token: string) {
    this.token = token;
  }
}
