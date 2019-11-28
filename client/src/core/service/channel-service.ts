import { ChannelRepositoryType } from "core/use-case/channel-repository-type";
import { ChannelModel } from "core/model/channel-model";
import { Channel } from "core/entity/channel";

/**
 *
 * 채널 비즈니스 로직 처리하는 객체
 *
 * */
export class ChannelService {
  private repository: ChannelRepositoryType;

  constructor(channelRepository: ChannelRepositoryType) {
    this.repository = channelRepository;
  }

  /**
   *
   * 채널 생성
   *
   * @param title
   * @param description
   * @param privacy
   * @return boolean 생성 여부
   *
   * */
  async create(
    title: string,
    description: string,
    privacy: boolean
  ): Promise<boolean | Channel> {
    const channel: ChannelModel = new ChannelModel(title, description, privacy);
    const satisfaction = await this.isSatisfied(channel);
    if (satisfaction) {
      return this.repository.create(channel);
    }
    return false;
  }

  /**
   *
   * 채널 생성하기 위한 검증
   * @param channel
   *
   * */
  private async isSatisfied(channel: ChannelModel): Promise<boolean> {
    if (channel.isImpossibleFormat()) {
      return false;
    }
    return await this.isNotDuplicated(channel.getTitle());
  }

  /**
   *
   * 채널명 중복 확인
   * @param title
   *
   * */
  private async isNotDuplicated(title: string): Promise<boolean> {
    const redundancy = await this.repository.hasByTitle(title);
    return !redundancy;
  }

  async getChannelList(): Promise<Channel[] | boolean> {
    return await this.repository.getChannels();
  }
}
