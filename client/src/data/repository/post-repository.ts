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
      if ((responseEntity as ResponseEntity<posts<Post>>).payload) {
        return (responseEntity as ResponseEntity<posts<Post>>).payload.posts;
      }
      return responseEntity as boolean;
    } catch (error) {
      return false;
    }
  }

  async create(post: Post, channel: Channel): Promise<boolean> {
    try {
      const responseEntity = await this.api.createPost(post, channel);
      if (responseEntity as ResponseEntity<object>) return true;
      return responseEntity as boolean;
    } catch (error) {
      return false;
    }
  }

  async createWithFile(
    post: Post,
    channel: Channel,
    file: File
  ): Promise<boolean> {
    try {
      // file upload 요청
      const fileResult = await (this.api.uploadFile(file) as ResponseEntity<
        string
      >);

      // 실제 파일 포스트
      const responseEntity = await this.api.createPost(
        post,
        channel,
        fileResult.payload
      );

      if (responseEntity as ResponseEntity<object>) return true;
      return responseEntity as boolean;
    } catch (error) {
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
      if (responseEntity as ResponseEntity<object>) return true;
      return responseEntity as boolean;
    } catch (error) {
      return false;
    }
  }

  async getReplyList(postId: number): Promise<Thread | boolean> {
    try {
      const responseEntity = await this.api.getReplyList(postId);
      if ((responseEntity as ResponseEntity<Thread>).payload) {
        return (responseEntity as ResponseEntity<Thread>).payload;
      }
      return responseEntity as boolean;
    } catch (error) {
      return false;
    }
  }
}
