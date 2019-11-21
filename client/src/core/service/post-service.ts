import { Channel } from "core/entity/channel";
import { Post, Profile } from "core/entity/post";
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

  async createMessage(profileId: number, contents: string): Promise<boolean> {
    const profile: Profile = {
      profileId: profileId
    };
    const post: Post = {
      contents: contents
    };
    return await this.repository.create(profile, post);
  }
}
