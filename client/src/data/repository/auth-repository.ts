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
      const payload: { [key: string]: any } = <object>jwt.decode(result.token);
      const user: User = {
        email: payload.email,
        id: payload.id
      };
      return user;
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
    try {
      const result = await this.api.login(user);
      if (typeof result === "boolean")
        throw new Error("로그인에 실패했습니다.");
      return result.payload;
    } catch (error) {
      return { token: "" };
    }
  }

  isLogined(): boolean {
    try {
      const result = this.storage.get();
      if (result == null) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  logout(): boolean {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      return false;
    }
  }
}
