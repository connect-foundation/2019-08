import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { Post } from "core/entity/post";
import { Profile } from "core/entity/profile";
import { Channel } from "core/entity/channel";
import { PostRepositoryType } from "core/use-case/post-repository-type";
import { PostApi, posts } from "data/http/api/post-api";
import { Thread } from "../../core/entity/thread";

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

  async create(post: Post, channel: Channel): Promise<boolean> {
    try {
      const responseEntity = await this.api.createPost(post, channel);
      console.log(responseEntity);
      if (<ResponseEntity<object>>responseEntity) return true;
      return <boolean>responseEntity;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async reply(
    profile: Profile,
    post: Post,
    parentPost: Post,
    channel: Channel
  ): Promise<boolean> {
    try {
      const responseEntity = await this.api.reply(
        profile,
        post,
        parentPost,
        channel
      );
      if (<ResponseEntity<object>>responseEntity) return true;
      return <boolean>responseEntity;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getReplyList(postId: number): Promise<Thread | boolean> {
    try {
      const responseEntity = await this.api.getReplyList(postId);
      if ((<ResponseEntity<Thread>>responseEntity).payload) {
        return (<ResponseEntity<Thread>>responseEntity).payload;
      }
      return <boolean>responseEntity;
    } catch (error) {
      return false;
    }
  }
}
