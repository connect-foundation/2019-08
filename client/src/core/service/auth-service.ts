import { User } from "core/entity/user";
import { AuthRepositoryType } from "core/use-case/auth-repository-type";

export class AuthService {
  private repository: AuthRepositoryType;

  constructor(repository: AuthRepositoryType) {
    this.repository = repository;
  }

  async login(email: string, password: string): Promise<boolean> {
    const user: User = { email, password };
    const JsonWebToken = await this.repository.login(user);
    if (!JsonWebToken.token) return false;
    this.repository.setToken(JsonWebToken.token);
    return true;
  }

  getUserInfo(): User {
    const user = this.repository.getUserInfo();
    return user;
  }

  isLogined(): boolean {
    return this.repository.isLogined();
  }

  logout(): boolean {
    return this.repository.logout();
  }
}
