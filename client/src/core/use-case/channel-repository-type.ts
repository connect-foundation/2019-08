import {Channel} from "@src/core/entity/channel";

export interface ChannelRepositoryType {
    create(channel: Channel): boolean;

    hasByName(channelName: string): boolean;

}