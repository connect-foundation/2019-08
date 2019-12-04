import { User } from "core/entity/user";
import { AuthRepositoryType } from "core/use-case/auth-repository-type";

export class AuthService {
  private repository: AuthRepositoryType;

  constructor(repository: AuthRepositoryType) {
    this.repository = repository;
  }

  login(email: string, password: string) {
    const user: User = { email, password };
  }
}
