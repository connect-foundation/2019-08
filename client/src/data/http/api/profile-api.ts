import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { Profile } from "core/entity/profile";
import { StatusCodes } from "./status-codes";
import Axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  CancelToken
} from "axios";
import { AxiosWrapper } from "./axios-wrapper";
import { ResponseEntity } from "./response/ResponseEntity";

export class ProfileApi {
  private axios: AxiosInstance;
  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  updateProfile(
    profile: Profile,
    filePath: string
  ): Promise<ResponseEntity<Profile> | boolean> {
    const payload = {
      name: profile.name,
      status: profile.status,
      thumbnail: filePath,
      phone: profile.phone,
      description: profile.description
    };
    return this.axios
      .patch(`/api/profiles/${profile.id}`, payload)
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

  getProfileToken(snugId: number, cancelToken?: CancelToken): Promise<void> {
    return this.axios
      .get(`/api/auth/snugs/${snugId}/profiles`, {
        cancelToken: cancelToken
      })
      .then(({ status }: AxiosResponse<ResponseEntity<void>>) => {
        if (StatusCodes.isNotOk(status)) {
          throw new Error("프로필 토큰 조회에 실패 했습니다.");
        }
      })
      .catch((error: AxiosError) => {
        if (Axios.isCancel(error)) return;
        AxiosErrorHandler.handleError(
          error,
          `프로필 토큰을 조회하는 과정에서 문제가 발생했습니다. : ${error.message}`
        );
      });
  }
}
