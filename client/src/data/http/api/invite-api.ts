import { AxiosWrapper } from "./axios-wrapper";
import { AxiosError, AxiosResponse } from "axios";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { StatusCodes } from "data/http/api/status-codes";
import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { Invite } from "core/entity/invite";

export class InviteApi {
  private axios: any;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  sendEmails(snugId: string, emails: string[]) {
    return this.axios
      .post(`/api/snugs/${snugId}/invite`, { snugId, emails })
      .then((response: AxiosResponse<ResponseEntity<string[]>>) =>
        StatusCodes.isOk(response.status)
      )
      .catch((error: AxiosError) =>
        AxiosErrorHandler.handleError(
          error,
          `${emails!} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }

  getInvitedSnugs(userId: number): Promise<ResponseEntity<Invite[]> | boolean> {
    return this.axios
      .get(`/api/users/${userId}/invite`)
      .then((response: AxiosResponse<ResponseEntity<Invite[]>>) => {
        if (StatusCodes.isOk(response.status)) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch((error: AxiosError) =>
        AxiosErrorHandler.handleError(
          error,
          `${userId} 기반으로 snug 조회 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }

  responseToInvitation(
    invite: Invite,
    agree: boolean
  ): Promise<ResponseEntity<Invite> | boolean> {
    return this.axios
      .post(invite.link, { agree })
      .then((response: AxiosResponse<ResponseEntity<Invite>>) => {
        if (StatusCodes.isAccepted(response.status)) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch((error: AxiosError) =>
        AxiosErrorHandler.handleError(
          error,
          `${invite.snug} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }
}
