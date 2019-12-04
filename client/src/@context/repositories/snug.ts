import { SnugApi } from "data/http/api/snug-api";
import { SnugRepository } from "data/repository/snug-repository";
import { SnugRepositoryType } from "core/use-case/snug-repository-type";

export class SnugRepositoryDependency {
  private readonly postRepository: SnugRepositoryType;

  constructor(api: SnugApi) {
    this.postRepository = new SnugRepository(api);
  }

  getSnugRepository(): SnugRepositoryType {
    return this.postRepository;
  }
}
