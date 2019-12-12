import { Profile } from "./profile";

export interface Post {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  contents?: string;
  profile?: Profile;
  room?: number;
}
