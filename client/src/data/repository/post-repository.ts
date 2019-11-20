import { Post } from "core/entity/post";
import { Profile } from "core/entity/post";
import { Channel } from "core/entity/channel";
import { PostRepositoryType } from "core/use-case/post-repository-type";
import { PostApi } from "data/http/api/post-api";

export class PostRepository implements PostRepositoryType {
  private api: PostApi;
  constructor(api: PostApi) {
    this.api = api;
  }

  getList(channel: Channel) {
    return this.api.getList(channel);
  }

  create(profile: Profile, post: Post) {
    return this.api.createPost(profile, post);
  }
}
