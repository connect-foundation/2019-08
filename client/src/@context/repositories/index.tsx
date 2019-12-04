import { StorageProviderDependencies } from "@context/storage-providers/storage-providers";
import { HttpProviderDependencies } from "@context/http-providers/http-providers";
import { ChatRoomRepositoryDependency } from "./chat-room";
import { PostingRepositoryDependency } from "./posting";
import { SnugRepositoryDependency } from "./snug";

export class RepositoryDependencies {
  private readonly chatRoom: ChatRoomRepositoryDependency;
  private readonly posting: PostingRepositoryDependency;
  private readonly snug: SnugRepositoryDependency;

  constructor(
    apies: HttpProviderDependencies,
    storage: StorageProviderDependencies
  ) {
    this.chatRoom = new ChatRoomRepositoryDependency(apies.getChannel());
    this.posting = new PostingRepositoryDependency(apies.getPost());
    this.snug = new SnugRepositoryDependency(apies.getSnug());
  }

  getChatRoom() {
    return this.chatRoom;
  }

  getPosting() {
    return this.posting;
  }

  getSnug() {
    return this.snug;
  }
}
