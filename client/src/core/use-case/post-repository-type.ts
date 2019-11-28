import { Channel } from "core/entity/channel";
import { Post, Profile } from "core/entity/post";

export interface PostRepositoryType {
  getList(channel: Channel): Promise<Post[] | boolean>;

  create(profile: Profile, post: Post, channel: Channel): Promise<boolean>;
}
