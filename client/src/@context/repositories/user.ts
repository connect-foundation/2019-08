import { UserApi } from "data/http/api/user-api";
import { UserRepositoryType } from "core/use-case/user-repository-type";
import { UserRepository } from "data/repository/user-repository";

export class UserRepositoryDependency {
  private readonly userRepository: UserRepositoryType;

  constructor(api: UserApi) {
    this.userRepository = new UserRepository(api);
  }

  getUserRepository(): UserRepositoryType {
    return this.userRepository;
  }
}
