import { AxiosErrorHandler } from "data/http/api/axiosErrorHandler";
import { Post } from "core/entity/post";
import { Profile } from "core/entity/profile";
import { Channel } from "core/entity/channel";
import { StatusCodes } from "./status-codes";
import Axios, { AxiosResponse, AxiosError, CancelToken } from "axios";
import { AxiosWrapper } from "./axios-wrapper";
import { ResponseEntity } from "./response/ResponseEntity";
import { Thread } from "../../../core/entity/thread";

export interface posts<T> {
  posts: T[];
}

export class PostApi {
  private axios: any;

  constructor(axios: AxiosWrapper) {
    this.axios = axios.getAxios();
  }

  getList(
    { id }: Channel,
    cancelToken?: CancelToken,
    postId?: number
  ): ResponseEntity<posts<Post>> | boolean {
    let url = `/api/channels/${id}/posts`;
    if (postId) url = url + `?postId=${postId}`;
    return this.axios
      .get(url, {
        cancelToken: cancelToken
      })
      .then(({ data, status }: AxiosResponse<ResponseEntity<posts<Post>>>) => {
        if (StatusCodes.isOk(status)) return data;
        return false;
      })
      .catch((error: AxiosError) => {
        if (Axios.isCancel(error)) return;
        AxiosErrorHandler.handleError(
          error,
          `포스트 데이터를 가져오는 과정에서 오류가 발생했습니다 :${error.message}`
        );
      });
  }

  createPost(
    { contents }: Post,
    { id }: Channel,
    filePath: string = ""
  ): ResponseEntity<object> | boolean {
    return this.axios
      .post(`/api/posts/`, {
        contents: contents,
        roomId: id,
        filePath
      })
      .then(({ data, status }: AxiosResponse<ResponseEntity<object>>) => {
        if (StatusCodes.isCreated(status)) return data;
        return false;
      })
      .catch((error: AxiosError) => {
        AxiosErrorHandler.handleError(
          error,
          `포스트를 생성하는 과정에서 오류가 발생했습니다 : ${error.message}`
        );
      });
  }

  uploadFile(file: File): ResponseEntity<string> | boolean {
    const formData = new FormData();
    formData.append("file", file);

    return this.axios
      .post(`/api/uploader`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(({ data, status }: AxiosResponse<ResponseEntity<string>>) => {
        if (StatusCodes.isCreated(status)) return data;
        return false;
      })
      .catch((error: AxiosError) => {
        AxiosErrorHandler.handleError(
          error,
          `포스트를 생성하는 과정에서 오류가 발생했습니다 : ${error.message}`
        );
      });
  }

  reply(
    { id: profileId }: Profile,
    { contents }: Post,
    post: Post,
    { id }: Channel
  ): ResponseEntity<object> | boolean {
    return this.axios
      .post(`/api/posts/${post.id}/replies`, {
        profileId: profileId,
        contents: contents,
        postId: post.id,
        roomId: id
      })
      .then(({ data, status }: AxiosResponse<ResponseEntity<object>>) => {
        if (StatusCodes.isCreated(status)) return data;
        return false;
      })
      .catch((error: AxiosError) => {
        AxiosErrorHandler.handleError(
          error,
          `포스트를 생성하는 과정에서 오류가 발생했습니다 : ${error.message}`
        );
      });
  }

  getReplyList(postId: number): ResponseEntity<Thread> | boolean {
    return this.axios
      .get(`/api/posts/${postId}/replies`)
      .then(({ data, status }: AxiosResponse<ResponseEntity<Thread>>) => {
        if (StatusCodes.isOk(status)) return data;
        return false;
      })
      .catch((error: AxiosError) => {
        AxiosErrorHandler.handleError(
          error,
          `댓글 데이터를 가져오는 과정에서 오류가 발생했습니다 :${error.message}`
        );
      });
  }
}
