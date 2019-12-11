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
}
