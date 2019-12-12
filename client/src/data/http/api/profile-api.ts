import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { Profile } from "core/entity/profile";
import { StatusCodes } from "./status-codes";
import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { AxiosWrapper } from "./axios-wrapper";
import { ResponseEntity } from "./response/ResponseEntity";

export class ProfileApi {
  private axios: AxiosInstance;
  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  updateProfile(profile: Profile): Promise<ResponseEntity<Profile> | boolean> {
    return this.axios
      .patch(`/api/profiles/${profile.id}`, profile)
      .then((response: AxiosResponse<ResponseEntity<Profile>>) => {
        if (StatusCodes.isAccepted(response.status)) return response.data;
        return false;
      })
      .catch((error: AxiosError) => {
        return AxiosErrorHandler.handleError(
          error,
          `프로필을 갱신하는 과정에서 오류가 발생했습니다 : ${error.message}`
        );
      });
  }

  getProfileToken(snugId: number): Promise<void> {
    return this.axios
      .get(`/api/auth/snugs/${snugId}/profiles`)
      .then(({ status }: AxiosResponse<ResponseEntity<void>>) => {
        if (StatusCodes.isNotOk(status)) {
          throw new Error("프로필 토큰 조회에 실패 했습니다.");
        }
      })
      .catch((error: AxiosError) => {
        AxiosErrorHandler.handleError(
          error,
          `프로필 토큰을 조회하는 과정에서 문제가 발생했습니다. : ${error.message}`
        );
      });
  }
}
