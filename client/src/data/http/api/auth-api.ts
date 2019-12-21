import {User} from "core/entity/user";
import {StatusCodes} from "./status-codes";
import {AxiosInstance, AxiosResponse} from "axios";
import {AxiosWrapper} from "./axios-wrapper";
import {ResponseEntity} from "./response/ResponseEntity";
import {WebToken} from "core/entity/token";

export class AuthApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  login(user: User): Promise<ResponseEntity<WebToken<string>>> {
    return this.axios
      .post("/api/auth/login", user)
      .then(
        ({ data, status }: AxiosResponse<ResponseEntity<WebToken<string>>>) => {
          if (StatusCodes.isOk(status)) {
            return data;
          }

          throw new Error("로그인에 실패 했습니다.");
        }
      );
  }

  logout(): Promise<boolean> {
    return this.axios
      .post("/api/auth/logout")
      .then(({ status }: AxiosResponse<ResponseEntity<WebToken<void>>>) =>
              StatusCodes.isOk(status));
  }
}
