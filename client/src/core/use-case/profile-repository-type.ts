import { Profile } from "core/entity/profile";

export interface ProfileRepositoryType {
  getList(): Promise<Profile[] | boolean>;
}
