import { PostRepository } from "./../../data/repository/post-repository";
import { PostRepositoryType } from "core/use-case/post-repository-type";
import { HttpProviderDependencies } from "@context/http-providers/http-providers";
import { ChannelRepositoryType } from "core/use-case/channel-repository-type";
import { ChannelRepository } from "data/repository/channel-repository";

export class ChatRoomRepositoryDependency {
  private readonly channelRepository: ChannelRepositoryType;
  private readonly postRepository: PostRepositoryType;

  constructor(api: HttpProviderDependencies) {
    this.channelRepository = new ChannelRepository(api.getChannel());
    this.postRepository = new PostRepository(api.getPost());
  }

  getChannelRepository(): ChannelRepositoryType {
    return this.channelRepository;
  }
  getPostRepository(): PostRepositoryType {
    return this.postRepository;
  }
}
