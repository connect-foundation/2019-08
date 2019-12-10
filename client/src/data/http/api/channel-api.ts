import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { Channel } from "core/entity/channel";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { ResponseEntity } from "./response/ResponseEntity";
import { StatusCodes } from "./status-codes";
import { AxiosWrapper } from "./axios-wrapper";

export class ChannelApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  create(channel: Channel): Promise<ResponseEntity<Channel> | boolean> {
    return this.axios
      .post(`/api/channels`, {
        title: channel.title!,
        description: channel.description!,
        privacy: channel.privacy!
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
          `${channel.title!} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }

  findByTitle(title: string): Promise<ResponseEntity<Channel> | boolean> {
    return this.axios
      .get(`/api/channels/${title}`)
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
          `${title} 조회 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }

  getList(): Promise<ResponseEntity<Channel[]> | boolean> {
    return this.axios
      .get("/api/channels")
      .then((response: AxiosResponse<ResponseEntity<Channel[]>>) => {
        if (StatusCodes.isOk(response.status)) return response.data;
        return false;
      })
      .catch((error: AxiosError) => {
        return AxiosErrorHandler.handleError(
          error,
          `채널 목록을 불러오는 과정에서 예기치 못한 에러가 발생했습니다.`
        );
      });
  }

  join(channel: Channel): Promise<boolean> {
    return this.axios
      .get(`/api/channels/${channel.id}/join`)
      .then((response: AxiosResponse<ResponseEntity<{}>>) => {
        if (response.status == 200) return true;
        return false;
      })
      .catch(() => {
        return false;
      });
  }
}
