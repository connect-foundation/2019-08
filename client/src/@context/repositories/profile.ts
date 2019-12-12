import { ProfileApi } from "data/http/api/profile-api";
import { ProfileRepository } from "data/repository/profile-repository";
import { ProfileRepositoryType } from "core/use-case/profile-repository-type";

export class ProfileRepositoryDependency {
  private readonly profileRepository: ProfileRepositoryType;

  constructor(api: ProfileApi) {
    this.profileRepository = new ProfileRepository(api);
  }

  getProfileRepository(): ProfileRepositoryType {
    return this.profileRepository;
  }
}
