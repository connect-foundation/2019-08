import {ChannelApi} from "@src/data/http/api/channel-api";
import axios from 'axios';
import {AxiosConfig} from "@src/config/axios-config";

export class HttpProviderDependencies {
    private readonly  channel: ChannelApi;

    constructor() {
        AxiosConfig.initialize(axios);
        this.channel = new ChannelApi(axios);

    }

    getChannel(): ChannelApi {
        return this.channel;

    }

}
