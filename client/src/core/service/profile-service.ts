import { Profile } from "core/entity/profile";
import { ProfileRepositoryType } from "core/use-case/profile-repository-type";

export class ProfileService {
  private static readonly PROFILE_NULL_OBJECT = {};
  private repository: ProfileRepositoryType;

  constructor(repository: ProfileRepositoryType) {
    this.repository = repository;
  }

  async getProfile(snugId: number): Promise<Profile> {
    try {
      const profile = await this.repository.getProfile(); // 브라우저에서 프로필 존재 유무 확인
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
      await this.repository.getProfileToken(snugId); // 서버에서 만든 새로운 토큰을 조회
      return await this.repository.getProfile();
    } catch (error) {
      return {};
    }
  }

  async updateProfile(profile: Profile): Promise<Profile | boolean> {
    return await this.repository.updateProfile(profile);
  }
}
