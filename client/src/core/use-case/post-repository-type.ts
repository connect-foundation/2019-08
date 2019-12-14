import { Channel } from "core/entity/channel";
import { Post } from "core/entity/post";
import { Profile } from "core/entity/profile";
import {Thread} from "../entity/thread";

export interface PostRepositoryType {
  getList(channel: Channel): Promise<Post[] | boolean>;

  create(profile: Profile, post: Post, channel: Channel): Promise<boolean>;

  reply(profile: Profile, post: Post, parentPost: Post, channel: Channel): Promise<boolean>;

  getReplyList(postId: number): Promise<Thread | boolean>;
}
