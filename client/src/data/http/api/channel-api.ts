import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { Channel } from "core/entity/channel";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { ResponseEntity } from "./response/ResponseEntity";
import { StatusCodes } from "./status-codes";
import { AxiosWrapper } from "./axios-wrapper";
import { Snug } from "core/entity/snug";

export class ChannelApi {
  private axios: AxiosWrapper;

  constructor(axios: AxiosWrapper) {
    this.axios = axios;
  }

  create(
    snug: Snug,
    channel: Channel
  ): Promise<ResponseEntity<Channel> | boolean> {
    return this.axios
      .getAxios()
      .post(`/api/channels`, {
        snugId: snug.id!,
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
      .getAxios()
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

  getParticipatingList(snug: Snug): Promise<ResponseEntity<object> | boolean> {
    return this.axios
      .getAxios()
      .get(`/api/snugs/${snug.id!}/participates/channels`)
      .then((response: AxiosResponse<ResponseEntity<object>>) => {
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

  getList(snug: Snug): Promise<ResponseEntity<object> | boolean> {
    return this.axios
            .getAxios()
            .get(`/api/snugs/${snug.id!}/channels`)
            .then((response: AxiosResponse<ResponseEntity<object>>) => {
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
      .getAxios()
      .post(`/api/channels/join`, {
        channelId: channel.id
      })
      .then((response: AxiosResponse<ResponseEntity<{}>>) => {
        return StatusCodes.isOk(response.status);
      })
      .catch(() => {
        return false;
      });
  }
}
