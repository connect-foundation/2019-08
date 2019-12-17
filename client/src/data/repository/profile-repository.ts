import { ResponseEntity } from "data/http/api/response/ResponseEntity";
import { ProfileRepositoryType } from "core/use-case/profile-repository-type";
import { ProfileApi } from "data/http/api/profile-api";
import { Profile } from "core/entity/profile";
import { getCookie } from "util/cookie";
import jwt from "jsonwebtoken";

export class ProfileRepository implements ProfileRepositoryType {
  private api: ProfileApi;

  constructor(api: ProfileApi) {
    this.api = api;
  }

  async getProfile(): Promise<Profile> {
    try {
      const token: string | boolean = getCookie("profile");
      if (typeof token === "boolean")
        throw new Error("프로필 쿠키가 존재하지 않습니다.");
      const profile: Profile = jwt.decode(token) as Profile;
      return profile;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProfile(profile: Profile): Promise<Profile | boolean> {
    try {
      const responseEntity = await this.api.updateProfile(profile);
      if ((responseEntity as ResponseEntity<Profile>).payload) {
        return (responseEntity as ResponseEntity<Profile>).payload;
      }
      return responseEntity as boolean;
    } catch (error) {
      return false;
    }
  }

  async getProfileToken(snugId: number): Promise<void> {
    return await this.api.getProfileToken(snugId);
  }
}
