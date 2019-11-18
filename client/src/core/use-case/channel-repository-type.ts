import {Channel} from "../entity/channel";

export interface ChannelRepositoryType {
    create(channel: Channel): Promise<boolean>;

    hasByName(channelName: string): Promise<boolean>;

}