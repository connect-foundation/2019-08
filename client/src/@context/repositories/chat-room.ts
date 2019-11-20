import {ChannelRepositoryType} from "core/use-case/channel-repository-type";
import {ChannelRepository} from "data/repository/channel-repository";

export class ChatRoomRepositoryDependency {
  private readonly channelRepository: ChannelRepositoryType;

  constructor(api: any) {
    this.channelRepository = new ChannelRepository(api);
  }

  getChannelRepository() {
    return this.channelRepository;
  }
}