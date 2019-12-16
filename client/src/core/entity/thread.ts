import {Post} from "./post";

export interface Thread {
  post: Post;
  replies: Post[];
}
