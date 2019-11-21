import { ResponseEntity } from "data/http/api/response/ResponseEntity";
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

  async getList(channel: Channel): Promise<Post[] | boolean> {
    try {
      const responseEntity = await this.api.getList(channel);
      if ((<ResponseEntity<Post[]>>responseEntity).payload) {
        return (<ResponseEntity<Post[]>>responseEntity).payload;
      }
      return <boolean>responseEntity;
    } catch (error) {
      return false;
    }
  }

  async create(profile: Profile, post: Post): Promise<boolean> {
    try {
      const responseEntity = await this.api.createPost(profile, post);
      if (<ResponseEntity<object>>responseEntity) return true;
      return <boolean>responseEntity;
    } catch (error) {
      return false;
    }
  }
}
