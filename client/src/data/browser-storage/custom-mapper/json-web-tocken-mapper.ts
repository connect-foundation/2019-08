import { BrowserStorageMapper } from "../browser-storage-mapper";
import { JsonWebToken } from "core/model/json-web-token-model";
export class JsonWebTokenMapper implements BrowserStorageMapper<JsonWebToken> {
  fromJson(json: string) {
    const value = JSON.parse(json);
    return new JsonWebToken(value.token);
  }
  toJson(target: JsonWebToken) {
    return JSON.stringify({
      token: target.token
    });
  }
}
