import { AxiosErrorHandler } from "./../../../util/axiosErrorHandler";
import { Post } from "core/entity/post";
import { Channel } from "core/entity/channel";
import { StatusCodes } from "./status-codes";
import { AxiosResponse, AxiosError } from "axios";
import { AxiosWrapper } from "./axios-wrapper";
import { ResponseEntity } from "./response/ResponseEntity";

export class PostApi {
  private axios: any;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  getList({ id }: Channel) {
    return this.axios()
      .get(`/post/${id}`)
      .then(({ data, status }: AxiosResponse<ResponseEntity<Post[]>>) => {
        if (StatusCodes.isOk(status)) return data.payload;
        return false;
      })
      .catch((error: AxiosError) => {
        AxiosErrorHandler.handleError(
          error,
          `포스트 데이터를 가져오는 과정에서 오류가 발생했습니다 :${error.message}`
        );
      });
  }
}
