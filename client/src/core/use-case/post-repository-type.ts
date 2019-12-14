import { Channel } from "core/entity/channel";
import { Post } from "core/entity/post";
import { Profile } from "core/entity/profile";

export interface PostRepositoryType {
  getList(channel: Channel): Promise<Post[] | boolean>;

  create(profile: Profile, post: Post, channel: Channel): Promise<boolean>;

  getReplyList(postId: number): Promise<Post[] | boolean>;
}
