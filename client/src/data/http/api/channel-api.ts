import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { Channel } from "core/entity/channel";
import Axios, { AxiosError, AxiosResponse, CancelToken } from "axios";
import { ResponseEntity } from "./response/ResponseEntity";
import { StatusCodes } from "./status-codes";
import { AxiosWrapper } from "./axios-wrapper";
import { Snug } from "core/entity/snug";
import { ParticipateInfo } from "../../../core/entity/participate-info";
import { ChannelModel } from "../../../core/model/channel-model";
import {
  ChannelResponseType,
  ChannelsResponseType
} from "./response/type/channel";

export class ChannelApi {
  private axios: AxiosWrapper;

  constructor(axios: AxiosWrapper) {
    this.axios = axios;
  }

  create(channel: ChannelModel): Promise<ChannelResponseType> {
    return this.axios
      .getAxios()
      .post(`/api/channels`, {
        snugId: channel.snugId!,
        title: channel.title!,
        description: channel.description!,
        privacy: channel.privacy!
      })
      .then((response: AxiosResponse<ResponseEntity<ChannelResponseType>>) => {
        if (StatusCodes.isCreated(response.status)) {
          return response.data.payload;
        }

        throw new Error(
          `${channel.title!} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
        );
      });
  }

  findByTitleAndSnugId(
    title: string,
    snugId: string
  ): Promise<ResponseEntity<ChannelResponseType>> {
    return this.axios
      .getAxios()
      .get(`/api/snugs/${snugId}/channels/${title}`)
      .then((response: AxiosResponse<ResponseEntity<ChannelResponseType>>) => {
        if (StatusCodes.isOk(response.status)) {
          return response.data;
        }

        throw new Error(
          `${title} 조회 과정에서 예기치 못한 에러가 발생했습니다.`
        );
      });
  }

  getParticipatingList(
    snug: Snug,
    cancelToken?: CancelToken
  ): Promise<ChannelsResponseType> {
    return this.axios
      .getAxios()
      .get(`/api/snugs/${snug.id!}/participates/channels`, {
        cancelToken: cancelToken
      })
      .then((response: AxiosResponse<ResponseEntity<ChannelsResponseType>>) => {
        if (StatusCodes.isOk(response.status)) return response.data.payload;
        throw new Error(
          `채널 목록을 불러오는 과정에서 예기치 못한 에러가 발생했습니다.`
        );
      })
      .catch((error: AxiosError) => {
        if (Axios.isCancel(error)) throw new Error(error.message);
        return {} as ChannelsResponseType;
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

  getById(
    channelId: number,
    cancelToken?: CancelToken
  ): Promise<ChannelResponseType> {
    return this.axios
      .getAxios()
      .get(`/api/channels/${channelId}`, {
        cancelToken: cancelToken
      })
      .then((response: AxiosResponse<ResponseEntity<ChannelResponseType>>) => {
        if (StatusCodes.isOk(response.status)) {
          return response.data.payload;
        }

        throw new Error(
          "채널을 불러오는 과정에서 예기치 못한 에러가 발생했습니다"
        );
      });
  }

  join(channel: Channel): Promise<ParticipateInfo> {
    return this.axios
      .getAxios()
      .post(`/api/channels/join`, { channelId: channel.id })
      .then((response: AxiosResponse<ResponseEntity<ParticipateInfo>>) => {
        if (StatusCodes.isCreated(response.status)) {
          return response.data.payload;
        }

        throw new Error();
      });
  }
}
