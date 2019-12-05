import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { Post } from "core/entity/post";
import { Profile } from "core/entity/profile";
import { Channel } from "core/entity/channel";
import { PostRepositoryType } from "core/use-case/post-repository-type";
import { PostApi, posts } from "data/http/api/post-api";

export class PostRepository implements PostRepositoryType {
  private api: PostApi;
  constructor(api: PostApi) {
    this.api = api;
  }

  async getList(channel: Channel): Promise<Post[] | boolean> {
    try {
      const responseEntity = await this.api.getList(channel);
      if ((<ResponseEntity<posts<Post>>>responseEntity).payload) {
        return (<ResponseEntity<posts<Post>>>responseEntity).payload.posts;
      }
      return <boolean>responseEntity;
    } catch (error) {
      return false;
    }
  }

  async create(
    profile: Profile,
    post: Post,
    channel: Channel
  ): Promise<boolean> {
    try {
      const responseEntity = await this.api.createPost(profile, post, channel);
      console.log(responseEntity);
      if (<ResponseEntity<object>>responseEntity) return true;
      return <boolean>responseEntity;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
