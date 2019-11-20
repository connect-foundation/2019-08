import { Channel } from "core/entity/channel";
import { StatusCodes } from "./status-codes";
import { AxiosResponse } from "axios";
import { AxiosWrapper } from "./axios-wrapper";

export class PostApi {
  private axios: any;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }
}
