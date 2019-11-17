import {Channel} from '@src/core/entity/channel.js';
import {AxiosError, AxiosResponse} from "axios";
import {ResponseEntity} from "@src/data/http/api/response/ResponseEntity";

export class ChannelApi {
    private axios: any;

    constructor(axios: object) {
        this.axios = axios;

    }

    create(channel: Channel): AxiosResponse<ResponseEntity<object>> {
        return this.axios.post(`/api/channel/${channel.name.getValue()}`, {
            name: channel.name.getValue(),
            description: channel.description.getValue(),
            visibility: channel.visibility

        }).catch((error: AxiosError) => {
            if (error.response) {
                return error.response;

            } else {
                console.error(error.message);
                throw new Error(`${channel.name.getValue()} 추가 과정에서 예기치 못한 에러가 발생했습니다.`);

            }

        });

    }

    findByName(channelName: string): AxiosResponse<ResponseEntity<Channel>> {
        return this.axios.get(`/api/channels/${channelName}`)
            .catch((error: AxiosError) => {
                if (error.response) {
                    return error.response;

                } else {
                    console.error(error.message);
                    throw new Error(`${channelName} 조회 과정에서 예기치 못한 에러가 발생했습니다.`);

                }

            });

    }

}