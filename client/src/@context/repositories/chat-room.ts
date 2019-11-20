import { ChannelApi } from "data/http/api/channel-api";
import { ChannelRepositoryType } from "core/use-case/channel-repository-type";
import { ChannelRepository } from "data/repository/channel-repository";

export class ChatRoomRepositoryDependency {
  private readonly channelRepository: ChannelRepositoryType;

  constructor(api: ChannelApi) {
    this.channelRepository = new ChannelRepository(api);
  }

  getChannelRepository(): ChannelRepositoryType {
    return this.channelRepository;
  }
}
