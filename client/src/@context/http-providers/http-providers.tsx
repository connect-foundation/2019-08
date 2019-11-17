import {ChannelApi} from "@src/data/http/api/channel-api";
import {AxiosWrapper} from "@src/data/http/api/AxiosWrapper";

export class HttpProviderDependencies {
    private readonly  channel: ChannelApi;
    private readonly axiosWrapper: AxiosWrapper;

    constructor() {
        this.axiosWrapper = new AxiosWrapper();
        this.channel = new ChannelApi(this.axiosWrapper);

    }

    getChannel(): ChannelApi {
        return this.channel;

    }

}
