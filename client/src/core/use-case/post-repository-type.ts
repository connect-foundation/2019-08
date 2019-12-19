import { Channel } from "core/entity/channel";
import { Post } from "core/entity/post";
import { Profile } from "core/entity/profile";
import { Thread } from "../entity/thread";
import { CancelToken } from "axios";

export interface PostRepositoryType {
  getList(
    channel: Channel,
    cancelToken?: CancelToken
  ): Promise<Post[] | boolean>;

  create(post: Post, channel: Channel): Promise<boolean>;

  createWithFile(
    contents: string,
    channelId: number,
    filePath: string
  ): Promise<boolean>;

  reply(
    profile: Profile,
    post: Post,
    parentPost: Post,
    channel: Channel
  ): Promise<boolean>;

  getReplyList(postId: number): Promise<Thread | boolean>;
}
