import {AxiosWrapper} from "./axios-wrapper";
import {AxiosError, AxiosResponse} from "axios";
import {ResponseEntity} from "data/http/api/response/ResponseEntity";
import {StatusCodes} from "data/http/api/status-codes";
import {AxiosErrorHandler} from "data/http/api/axiosErrorHandler";

export class InviteApi {
  private axios: any;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  sendEmails(snugId: string, emails: string[]) {
    return this.axios
            .post(`/api/snug/${snugId}/invite`, {snugId, emails})
            .then((response: AxiosResponse<ResponseEntity<string[]>>) => StatusCodes.isOk(response.status))
            .catch((error: AxiosError) =>
                    AxiosErrorHandler.handleError(
                            error,
                            `${emails!} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
                    )
            );
  }
}
