import { Profile } from "core/entity/profile";
import { ProfileRepositoryType } from "core/use-case/profile-repository-type";

export class ProfileService {
  private repository: ProfileRepositoryType;

  constructor(repository: ProfileRepositoryType) {
    this.repository = repository;
  }

  async getList(): Promise<Profile[] | boolean> {
    return await this.repository.getList();
  }
}
