import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { Post } from "core/entity/post";
import { Profile } from "core/entity/profile";
import { Channel } from "core/entity/channel";
import { PostRepositoryType } from "core/use-case/post-repository-type";
import { PostApi, posts } from "data/http/api/post-api";
import { Thread } from "../../core/entity/thread";
import { CancelToken } from "axios";

export class PostRepository implements PostRepositoryType {
  private api: PostApi;

  constructor(api: PostApi) {
    this.api = api;
  }

  async getList(
    channel: Channel,
    cancelToken?: CancelToken
  ): Promise<Post[] | boolean> {
    try {
      const responseEntity = await this.api.getList(channel, cancelToken);
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

  async createWithFile(contents: string, channelId: number, filePath: string) {
    const post: Post = {
      contents
    };
    const channel: Channel = {
      id: channelId
    };

    // 실제 파일 포스트
    const responseEntity = await this.api.createPost(post, channel, filePath);

    if (responseEntity as ResponseEntity<object>) return true;
    return responseEntity as boolean;
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
