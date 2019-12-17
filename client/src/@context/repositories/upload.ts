import { UploadApi } from "data/http/api/upload-api";
import { UploadRepository } from "data/repository/upload-repository";

export class UploadRepositoryDependency {
  private readonly profileRepository: UploadRepository;

  constructor(api: UploadApi) {
    this.profileRepository = new UploadRepository(api);
  }

  getProfileRepository(): UploadRepository {
    return this.profileRepository;
  }
}
