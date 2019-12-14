import {Channel} from "core/entity/channel";
import {Post} from "core/entity/post";
import {Profile} from "core/entity/profile";
import {PostRepositoryType} from "core/use-case/post-repository-type";
import {Thread} from "../entity/thread";
import {ProfileRepositoryType} from "../use-case/profile-repository-type";

export class PostService {
  private postRepository: PostRepositoryType;
  private profileRepository: ProfileRepositoryType;

  constructor(postRepository: PostRepositoryType, profileRepository: ProfileRepositoryType) {
    this.postRepository = postRepository;
    this.profileRepository = profileRepository;

  }

  async getList(channelId: number): Promise<Post[] | boolean> {
    const channel: Channel = {
      id: channelId
    };
    return await this.postRepository.getList(channel);
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
    return await this.postRepository.create(profile, post, Channel);
  }

  async reply(
          contents: string,
          channelId: number,
          parentPostId: number
  ): Promise<boolean> {
    const parentPost: Post = {
      id: parentPostId
    };
    const post: Post = {
      contents: contents
    };
    const Channel: Channel = {
      id: channelId
    };

    const profile = await this.profileRepository.getProfile();
    return await this.postRepository.reply(profile, post, parentPost, Channel);
  }

  async getReplyList(postId: number): Promise<Thread | boolean> {
    return await this.postRepository.getReplyList(postId);
  }
}
