import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { AxiosWrapper } from "data/http/api/axios-wrapper";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { StatusCodes } from "data/http/api/status-codes";
import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";

export class UploadApi {
  private axios: AxiosInstance;
  private config: AxiosRequestConfig;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
    this.config = {
      headers: {
        ContentType: "multipart/form-data"
      }
    };
  }

  async uploadFile(file: File): Promise<ResponseEntity<string> | undefined> {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const {
        data,
        status
      }: AxiosResponse<ResponseEntity<string>> = await this.axios.post(
        `/api/uploader`,
        formData,
        this.config
      );
      if (!StatusCodes.isCreated(status)) {
        throw new Error();
      }
      return data;
    } catch (error) {
      AxiosErrorHandler.handleError(
        error,
        `파일을 생성하는 과정에서 오류가 발생했습니다 : ${error.message}`
      );
    }
  }
}
