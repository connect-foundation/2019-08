import {ChannelRepositoryType} from "../../core/use-case/channel-repository-type";
import {ChannelRepository} from "../../data/repository/channel-repository";

export class ChatRoomRepositoryDependency {
    public channel: ChannelRepositoryType;

    constructor(api: any) {
        this.channel = new ChannelRepository(api);

    }

}