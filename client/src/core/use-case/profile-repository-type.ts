import { Profile } from "core/entity/profile";

export interface ProfileRepositoryType {
  getProfile(): Promise<Profile>;
  updateProfile(profile: Profile): Promise<Profile | boolean>;
  getProfileToken(snugId: number): Promise<void>;
}
