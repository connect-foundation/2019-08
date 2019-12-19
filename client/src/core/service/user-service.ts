import { User } from "core/entity/user";
import { UserRepositoryType } from "core/use-case/user-repository-type";

export class UserService {
  private repository: UserRepositoryType;

  constructor(repository: UserRepositoryType) {
    this.repository = repository;
  }

  /**
   *
   * User 생성하기 위한 함수
   * @param user
   *
   * */
  async create(user: User): Promise<boolean> {
    return await this.repository.create(user);
  }

  isAcceptableEmail(email: string): Promise<boolean> {
    return this.repository.isAcceptableEmail(email);
  }
}
