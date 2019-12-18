import { Profile } from "core/entity/profile";
import { ProfileRepositoryType } from "core/use-case/profile-repository-type";
import { UploadRepository } from "data/repository/upload-repository";
import { ResponseEntity } from "data/http/api/response/ResponseEntity";

export class ProfileService {
  private profileRepository: ProfileRepositoryType;
  private uploadRepository: UploadRepository;

  constructor(
    profileRepository: ProfileRepositoryType,
    uploadRepository: UploadRepository
  ) {
    this.profileRepository = profileRepository;
    this.uploadRepository = uploadRepository;
  }

  async getProfile(snugId: number): Promise<Profile> {
    try {
      const profile = await this.profileRepository.getProfile(); // 브라우저에서 프로필 존재 유무 확인
      if (this.hasVisitedPreviousSnug(snugId, profile)) {
        return profile;
      }
    } finally {
      return await this.retryFetchProfileToken(snugId);
    }
  }

  private hasVisitedPreviousSnug(snugId: number, profile: Profile): boolean {
    return profile && profile.snugId === snugId;
  }

  private async retryFetchProfileToken(snugId: number): Promise<Profile> {
    try {
      await this.profileRepository.getProfileToken(snugId); // 서버에서 만든 새로운 토큰을 조회
      return await this.profileRepository.getProfile();
    } catch (error) {
      return {};
    }
  }

  async updateProfile(
    profile: Profile,
    file: File
  ): Promise<Profile | boolean> {
    let filePath: string;
    // 파일 업로드
    if (file.size > 0) {
      const result = await this.uploadRepository.uploadFile(file);
      filePath = (result as ResponseEntity<string>).payload;
    } else {
      filePath = profile.thumbnail!;
    }

    return await this.profileRepository.updateProfile(profile, filePath);
  }
}
