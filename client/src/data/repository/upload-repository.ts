import { UploadApi } from "data/http/api/upload-api";

export class UploadRepository {
  private api: UploadApi;

  constructor(api: UploadApi) {
    this.api = api;
  }

  async uploadFile(file: File) {
    const result = await this.api.uploadFile(file);

    return result;
  }
}
