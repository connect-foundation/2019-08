import { StorageProviderDependencies } from "@context/storage-providers/storage-providers";
import { HttpProviderDependencies } from "@context/http-providers/http-providers";
import { ChatRoomRepositoryDependency } from "./chat-room";
import { PostingRepositoryDependency } from "./posting";
import { SnugRepositoryDependency } from "./snug";
import { AuthRepository } from "data/repository/auth-repository";

export class RepositoryDependencies {
  private readonly chatRoom: ChatRoomRepositoryDependency;
  private readonly posting: PostingRepositoryDependency;
  private readonly snug: SnugRepositoryDependency;

  private readonly auth: AuthRepository;
  constructor(
    apies: HttpProviderDependencies,
    storage: StorageProviderDependencies
  ) {
    this.chatRoom = new ChatRoomRepositoryDependency(apies.getChannel());
    this.posting = new PostingRepositoryDependency(apies.getPost());
    this.snug = new SnugRepositoryDependency(apies.getSnug());
    this.auth = new AuthRepository(apies.getAuth(), storage.getJwtLocal());
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
  getAuth() {
    return this.auth;
  }
}
