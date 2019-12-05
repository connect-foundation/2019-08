import { BrowserStorage } from "data/browser-storage/browser-storage";
import { JsonWebToken } from "core/model/json-web-token-model";
import { JsonWebTokenMapper } from "data/browser-storage/custom-mapper/json-web-tocken-mapper";
import { StorageType } from "data/browser-storage/browser-storage-helper";

export class StorageProviderDependencies {
  private readonly jwtLocal: BrowserStorage<JsonWebToken>;

  constructor() {
    this.jwtLocal = new BrowserStorage(
      "jwt",
      new JsonWebTokenMapper(),
      StorageType.LOCAL
    );
  }

  getJwtLocal(): BrowserStorage<JsonWebToken> {
    return this.jwtLocal;
  }
}
