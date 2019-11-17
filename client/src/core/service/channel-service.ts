import {ChannelRepositoryType} from "@src/core/use-case/channel-repository-type";
import {ChannelModel} from "@src/core/model/channel-model";

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
    create(name: string, description: string, visibility: boolean): boolean {
        const channel: ChannelModel = new ChannelModel(name, description, visibility);
        if (this.isSatisfied(channel)) {
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
    private isSatisfied(channel: ChannelModel): boolean {
        return channel.isPossibleFormat() && this.isNotDuplicated(channel.getName());

    }

    /**
     *
     * 채널명 중복 확인
     * @param name
     *
     * */
    private isNotDuplicated(name: string) {
        return !this.repository.hasByName(name);

    }

}