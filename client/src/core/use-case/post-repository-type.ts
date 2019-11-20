import { Channel } from "core/entity/channel";
import { Post, Profile } from "core/entity/post";

export interface PostRepositoryType {
  getList({ id }: Channel): Post[] | boolean;

  create({ profileId }: Profile, { contents }: Post): boolean;
}
