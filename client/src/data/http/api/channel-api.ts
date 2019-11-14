import {Channel} from '../../../core/entity/channel';
import {AxiosError, AxiosResponse} from "axios";
import {ResponseEntity} from "./response/ResponseEntity";

export class ChannelApi {
    private axios: any;

    constructor(axios: object) {
        this.axios = axios;

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