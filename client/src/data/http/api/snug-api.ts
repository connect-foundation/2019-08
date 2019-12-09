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
            if (StatusCodes.isCreated(response.status)) {
                return response.data;
            } else {
                return false;
            }
        })
        .catch((error: AxiosError) =>
            AxiosErrorHandler.handleError(
                error,
                `${input.name!} 추가 과정에서 예기치 못한 에러가 발생했습니다.`
            )
        );
    }

    getList(): Promise<ResponseEntity<Snug[]> | boolean> {
        return this.axios.get(`/api/snugs`)
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
                    `채널을 불러오는 과정에서 예기치 못한 에러가 발생했습니다.`
                )
            );
    }
}