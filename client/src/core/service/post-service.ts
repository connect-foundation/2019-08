import { Channel } from "core/entity/channel";
import { Post } from "core/entity/post";
import { Profile } from "core/entity/profile";
import { PostRepositoryType } from "core/use-case/post-repository-type";

export class PostService {
  private repository: PostRepositoryType;

  constructor(repository: PostRepositoryType) {
    this.repository = repository;
  }

  async getList(channelId: number): Promise<Post[] | boolean> {
    const channel: Channel = {
      id: channelId
    };
    return await this.repository.getList(channel);
  }

  async createMessage(
    profileId: number,
    contents: string,
    channelId: number
  ): Promise<boolean> {
    const profile: Profile = {
      id: profileId
    };
    const post: Post = {
      contents: contents
    };
    const Channel: Channel = {
      id: channelId
    };
    return await this.repository.create(profile, post, Channel);
  }

  async getReplyList(postId: number): Promise<Post[] | boolean> {
    return await this.repository.getReplyList(postId);
  }
}
