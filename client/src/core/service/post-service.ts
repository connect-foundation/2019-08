import { Channel } from "core/entity/channel";
import { Post } from "core/entity/post";
import { PostRepositoryType } from "core/use-case/post-repository-type";
import { ProfileRepositoryType } from "core/use-case/profile-repository-type";
import { UploadRepository } from "data/repository/upload-repository";
import { Thread } from "../entity/thread";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";

export class PostService {
  private postRepository: PostRepositoryType;
  private profileRepository: ProfileRepositoryType;
  private uploadRepository: UploadRepository;

  constructor(
    postRepository: PostRepositoryType,
    profileRepository: ProfileRepositoryType,
    uploadRepository: UploadRepository
  ) {
    this.postRepository = postRepository;
    this.profileRepository = profileRepository;
    this.uploadRepository = uploadRepository;
  }

  async getList(channelId: number): Promise<Post[] | boolean> {
    const channel: Channel = {
      id: channelId
    };
    return await this.postRepository.getList(channel);
  }

  async createMessage(contents: string, channelId: number): Promise<boolean> {
    const post: Post = {
      contents: contents
    };
    const Channel: Channel = {
      id: channelId
    };
    return await this.postRepository.create(post, Channel);
  }

  async createMessageWithFile(contents: string, channelId: number, file: File) {
    try {
      // 파일 업로드
      const result = await this.uploadRepository.uploadFile(file);

      // 포스트 등록
      return await this.postRepository.createWithFile(
        contents,
        channelId,
        (result as ResponseEntity<string>).payload
      );
    } catch (error) {
      console.error(error);
    }
  }

  async reply(
    contents: string,
    channelId: number,
    parentPostId: number
  ): Promise<boolean> {
    const parentPost: Post = {
      id: parentPostId
    };
    const post: Post = {
      contents: contents
    };
    const Channel: Channel = {
      id: channelId
    };

    const profile = await this.profileRepository.getProfile();
    return await this.postRepository.reply(profile, post, parentPost, Channel);
  }

  async getReplyList(postId: number): Promise<Thread | boolean> {
    return await this.postRepository.getReplyList(postId);
  }
}
