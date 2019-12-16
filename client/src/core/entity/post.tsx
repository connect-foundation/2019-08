import { Profile } from "./profile";
import { Channel } from "./channel";

export interface Post {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  contents?: string;
  profile?: Profile;
  replyCount?: string;
  room?: Channel;
  filePath?: string;
}
