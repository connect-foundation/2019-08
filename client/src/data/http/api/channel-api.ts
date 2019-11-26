import {AxiosErrorHandler} from "data/http/api/axiosErrorHandler";
import {Channel} from "core/entity/channel";
import {AxiosError, AxiosResponse} from "axios";
import {ResponseEntity} from "./response/ResponseEntity";
import {StatusCodes} from "./status-codes";
import {AxiosWrapper} from "./axios-wrapper";

export class ChannelApi {
  private axios: any;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  create(channel: Channel): ResponseEntity<Channel> | boolean {
    return this.axios
      .post(`/api/channels/${channel.name!}`, {
        name: channel.name!,
        description: channel.description!,
        visibility: channel.visibility
      })
      .then((response: AxiosResponse<ResponseEntity<Channel>>) => {
        if (StatusCodes.isCreated(response.status)) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch((error: AxiosError) =>
        AxiosErrorHandler.handleError(
          error,
          `${channel.name!} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }

  findByName(channelName: string): ResponseEntity<Channel> | boolean {
    return this.axios
      .get(`/api/channels/${channelName}`)
      .then((response: AxiosResponse<ResponseEntity<Channel>>) => {
        if (StatusCodes.isOk(response.status)) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch((error: AxiosError) =>
        AxiosErrorHandler.handleError(
          error,
          `${channelName} 조회 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }

  getList(): ResponseEntity<Channel[]> | boolean {
    return this.axios
      .get("/api/channels")
      .then((response: AxiosResponse<ResponseEntity<Channel[]>>) => {
        if (StatusCodes.isOk(response.status)) return response.data;
        return false;
      })
      .catch((error: AxiosError) => {
        AxiosErrorHandler.handleError(
          error,
          `채널 목록을 불러오는 과정에서 예기치 못한 에러가 발생했습니다.`
        );
      });
  }
}
