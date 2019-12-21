import { User } from "core/entity/user";
import { AuthRepositoryType } from "core/use-case/auth-repository-type";

export class AuthService {
  private repository: AuthRepositoryType;

  constructor(repository: AuthRepositoryType) {
    this.repository = repository;
  }

  async login(email: string, password: string): Promise<void> {
    const user: User = { email, password };
    const JsonWebToken = await this.repository.login(user);
    this.repository.setToken(JsonWebToken.token);
  }

  getUserInfo(): User {
    return this.repository.getUserInfo();
  }

  isLogined(): boolean {
    return this.repository.isLogined();
  }

  logout(): Promise<void> {
    return this.repository.logout();
  }
}
