import { Profile } from "core/entity/profile";
import { CancelToken } from "axios";

export interface ProfileRepositoryType {
  getProfile(): Profile;
  updateProfile(profile: Profile, filePath: string): Promise<Profile | boolean>;
  getProfileToken(snugId: number, cancelToken?: CancelToken): Promise<void>;
}
