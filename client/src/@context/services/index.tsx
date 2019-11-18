import {RepositoryDependencies} from "@context/repositories/index";
import {ChannelService} from "core/service/channel-service.js";

export class ServiceDependencies {
  private readonly channelService: ChannelService;

  constructor(repositories: RepositoryDependencies) {
    this.channelService = new ChannelService(repositories.getChatRoom().getChannelRepository());
  }
}
