import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { User } from "core/entity/user";
import { AxiosError, AxiosResponse } from "axios";
import { ResponseEntity } from "./response/ResponseEntity";
import { StatusCodes } from "./status-codes";
import { AxiosWrapper } from "./axios-wrapper";

export class UserApi {
  private axios: any;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  create(user: User): ResponseEntity<User> | boolean {
    return this.axios
      .post(`api/users`, {
        email: user.email,
        name: user.name,
        password: user.password
      })
      .then((response: AxiosResponse<ResponseEntity<User>>) => {
        if (StatusCodes.isCreated(response.status)) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch((error: AxiosError) =>
        AxiosErrorHandler.handleError(
          error,
          `${user.email!} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }
}
