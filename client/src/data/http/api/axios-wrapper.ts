import axios, { AxiosRequestConfig, AxiosStatic } from "axios";
import { BrowserStorage } from "data/browser-storage/browser-storage";
import { JsonWebToken } from "core/model/json-web-token-model";
import { JsonWebTokenMapper } from "data/browser-storage/custom-mapper/json-web-tocken-mapper";
import { StorageType } from "data/browser-storage/browser-storage-helper";

const jwtLocal = new BrowserStorage<JsonWebToken>(
  "jwt",
  new JsonWebTokenMapper(),
  StorageType.LOCAL
);

export class AxiosWrapper {
  private axios: AxiosStatic;
  constructor() {
    this.axios = axios;
    this.initialize();
  }

  private initialize(): void {
    if (process.env.NODE_ENV !== "development") {
      this.axios.defaults.baseURL = process.env.REACT_APP_API_SERVER_HOST;
    }

    this.axios.defaults.headers.common["Content-Type"] = "application/json";
    this.axios.defaults.headers.common["Accept"] = "application/json";
  }

  public getAxios() {
    if (jwtLocal.get() == null) return this.axios.create();
    else
      return this.axios.create({
        headers: {
          "Auth-Token": jwtLocal.get()!.token
        }
      });
  }
}
