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
   * @param name
   * @param description
   * @param visibility
   * @return boolean 생성 여부
   *
   * */
  async create(
    name: string,
    description: string,
    visibility: boolean
  ): Promise<boolean> {
    const channel: ChannelModel = new ChannelModel(
      name,
      description,
      visibility
    );
    const satisfaction = await this.isSatisfied(channel);
    if (satisfaction) {
      return this.repository.create(channel);
    }
    return false;
  }

  /**
   *
   * 채널 목록 불러오기
   *
   * @return boolean | Channel[]  채널 목록 혹은 false
   *
   * */
  async getChannels(): Promise<Channel[] | boolean> {
    const channels = await this.getChannels();
    if (channels) return channels;
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
    return await this.isNotDuplicated(channel.getName());
  }

  /**
   *
   * 채널명 중복 확인
   * @param name
   *
   * */
  private async isNotDuplicated(name: string): Promise<boolean> {
    const redundancy = await this.repository.hasByName(name);
    return !redundancy;
  }
}
