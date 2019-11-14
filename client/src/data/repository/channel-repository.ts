import {ChannelApi} from '../http/api/channel-api';
import {Channel} from "../../core/entity/channel";
import {ChannelRepositoryType} from "../../core/use-case/channel-repository-type";

export class ChannelRepository implements ChannelRepositoryType {
    private api: ChannelApi;
    private static readonly CREATED: number = 201;
    private static readonly OK: number = 201;

    constructor(api: ChannelApi) {
        this.api = api;

    }

    create(channel: Channel): boolean {
        const {status} = this.api.create(channel);
        return status === ChannelRepository.CREATED;

    }

    hasByName(channelName: string): boolean {
        const {status} = this.api.findByName(channelName);
        return status === ChannelRepository.OK;

    }

}