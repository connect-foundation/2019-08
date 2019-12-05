            if (StatusCodes.isCreated(response.status)) {
import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { Snug } from "core/entity/snug";
import { StatusCodes } from "./status-codes";
import { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { AxiosWrapper } from "./axios-wrapper";
import { ResponseEntity } from "./response/ResponseEntity";
export class SnugApi{
    private axios: AxiosInstance;
    constructor(axios: AxiosWrapper){
        this.axios = axios.getAxios();
    }
    create(input: Snug): Promise<ResponseEntity<Snug> | boolean> {
        return this.axios.post(`/api/snugs`, {
            name: input.name,
            description: input.description,
            thumbnail: input.thumbnail
        })
        .then((response: AxiosResponse<ResponseEntity<Snug>>) => {
                return response.data;
            } else {
                return false;
            }
        })
        .catch((error: AxiosError) =>
            AxiosErrorHandler.handleError(
                error,
                `${input.name!} �߰� �������� ����ġ ���� ������ �߻��߽��ϴ�.`
            )
        );
  getInvitedSnugs(email: string): Promise<ResponseEntity<Snug[]> | boolean> {
    return this.axios
      .get(`/api/user/${email}/invite`)
      .then((response: AxiosResponse<ResponseEntity<Snug[]>>) => {
        if (StatusCodes.isOk(response.status)) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch((error: AxiosError) =>
        AxiosErrorHandler.handleError(
          error,
          `${email} 기반으로 snug 조회 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }

  responseToInvitation(snug: Snug): Promise<ResponseEntity<Snug> | boolean> {
    return this.axios
      .post(`/api/invite`, {
        name: snug.name,
        id: snug.id
      })
      .then((response: AxiosResponse<ResponseEntity<Snug>>) => {
        if (StatusCodes.isOk(response.status)) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch((error: AxiosError) =>
        AxiosErrorHandler.handleError(
          error,
          `${snug.name} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
        )
      );
  }
}