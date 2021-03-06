import { UserApi } from "data/http/api/user-api";
import { User } from "core/entity/user";
import { UserRepositoryType } from "core/use-case/user-repository-type";

export class UserRepository implements UserRepositoryType {
  private api: UserApi;

  constructor(api: UserApi) {
    this.api = api;
  }

  async create(user: User): Promise<boolean> {
    try {
      const responseEntity = await this.api.create(user);
      return !!responseEntity;
    } catch (error) {
      return false;
    }
  }

  isAcceptableEmail(email: string): Promise<boolean> {
    return this.api.isAcceptableEmail(email);
  }
}
