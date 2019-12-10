import { Profile } from "core/entity/profile";

export interface ProfileRepositoryType {
  getProfile(id: number): Promise<Profile | boolean>;
  updateProfile(profile: Profile): Promise<Profile | boolean>;
}
