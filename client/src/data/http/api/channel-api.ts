import {Channel} from '../../../core/entity/channel';
import {AxiosError, AxiosResponse} from "axios";
import {ResponseEntity} from "./response/ResponseEntity";
import {StatusCodes} from "./status-codes";

export class ChannelApi {
  private axios: any;

  constructor(axios: object) {
    this.axios = axios;
  }

  create(channel: Channel): ResponseEntity<Channel> | boolean {
    return this.axios.post(`/api/channel/${channel.name.getValue()}`, {
      name: channel.name.getValue(),
      description: channel.description.getValue(),
      visibility: channel.visibility
    }).then((response: AxiosResponse<ResponseEntity<Channel>>) => {
      if (StatusCodes.isCreated(response.status)) {
        return response.data;

      } else {
        return false;

      }

    }).catch((error: AxiosError) => this.handleError(error, `${channel.name.getValue()} 추가 과정에서 예기치 못한 에러가 발생했습니다.`));

  }

  findByName(channelName: string): ResponseEntity<Channel> | boolean {
    return this.axios.get(`/api/channels/${channelName}`)
            .then((response: AxiosResponse<ResponseEntity<Channel>>) => {
              if (StatusCodes.isOk(response.status)) {
                return response.data;

              } else {
                return false;

              }

            })
            .catch((error: AxiosError) => this.handleError(error, `${channelName} 조회 과정에서 예기치 못한 에러가 발생했습니다.`));

  }

  handleError(error: AxiosError, message :string): boolean {
    if (error.response) {
      return false;

    } else {
      console.error(error.message);
      throw new Error(message);

    }

  }

}