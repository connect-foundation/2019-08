import { PostApi } from "./../../data/http/api/post-api";
import { PostRepository } from "./../../data/repository/post-repository";
import { PostRepositoryType } from "core/use-case/post-repository-type";

export class PostingRepositoryDependency {
  private readonly postRepository: PostRepositoryType;

  constructor(api: PostApi) {
    this.postRepository = new PostRepository(api);
  }
  getPostRepository(): PostRepositoryType {
    return this.postRepository;
  }
}
