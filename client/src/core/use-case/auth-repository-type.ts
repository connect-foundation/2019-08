import { User } from "core/entity/user";

export interface AuthRepositoryType {
  setToken(jwt: string): void;
  getUserInfo(): User;
  login(user: User): Promise<boolean>;
}
