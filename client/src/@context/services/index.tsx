import {RepositoryDependencies} from "../repositories/index";
import {ChannelService} from "../../core/service/channel-service.js";

export class ServiceDependencies {
  private channelService: ChannelService;

  constructor(repositories: RepositoryDependencies) {
    this.channelService = new ChannelService(repositories.chatRoom.channel);
  }
}
