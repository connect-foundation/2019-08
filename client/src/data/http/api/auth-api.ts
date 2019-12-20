import { User } from "core/entity/user";
import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { StatusCodes } from "./status-codes";
import { AxiosResponse, AxiosError, AxiosInstance } from "axios";
import { AxiosWrapper } from "./axios-wrapper";
import { ResponseEntity } from "./response/ResponseEntity";
import { WebToken } from "core/entity/token";

export class AuthApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  login(user: User): Promise<ResponseEntity<WebToken<string>> | boolean> {
    return this.axios
      .post("/api/auth/login", user)
      .then(
        ({ data, status }: AxiosResponse<ResponseEntity<WebToken<string>>>) => {
          if (StatusCodes.isOk(status)) {
            return data;
          }
          throw new Error("로그인에 실패 했습니다.");
        }
      )
      .catch((error: AxiosError) => {
        return AxiosErrorHandler.handleError(
          error,
          `로그인을 하는 과정에서 문제가 발생했습니다. : ${error.message}`
        );
      });
  }

  logout(): Promise<void> {
    return this.axios
      .post("/api/auth/logout")
      .then(({ status }: AxiosResponse<ResponseEntity<WebToken<void>>>) => {
        if (StatusCodes.isOk(status)) return;
        throw new Error("로그아웃을 하는 과정에서 문제가 발생했습니다.");
      })
      .catch(error => {
        throw new Error(error.message);
      });
  }
}
