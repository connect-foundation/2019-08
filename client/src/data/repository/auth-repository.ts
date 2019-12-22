import { JsonWebToken } from "core/model/json-web-token-model";
import { AuthRepositoryType } from "core/use-case/auth-repository-type";
import { AuthApi } from "data/http/api/auth-api";
import { BrowserStorage } from "data/browser-storage/browser-storage";
import jwt from "jsonwebtoken";
import { User } from "core/entity/user";
import { WebToken } from "core/entity/token";

export class AuthRepository implements AuthRepositoryType {
  private api: AuthApi;
  private storage: BrowserStorage<JsonWebToken>;

  constructor(api: AuthApi, storage: BrowserStorage<JsonWebToken>) {
    this.api = api;
    this.storage = storage;
  }

  getUserInfo(): User {
    try {
      const result = this.storage.get();
      if (result == null) return {};
      const payload: { [key: string]: any } = jwt.decode(
        result.token
      ) as object;
      return {
        email: payload.email,
        id: payload.id
      };
    } catch (error) {
      return {};
    }
  }

  setToken(token: string): void {
    try {
      this.storage.set(new JsonWebToken(token));
    } catch (error) {
      return;
    }
  }

  async login(user: User): Promise<WebToken<string>> {
    const {payload} = await this.api.login(user);
    return payload;
  }

  isLogined(): boolean {
    try {
      const result = this.storage.get();
      return result !== null;
    } catch (error) {
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.logout();
    } finally {
      this.storage.clear();
    }
  }
}
