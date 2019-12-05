import { StorageProviderDependencies } from "@context/storage-providers/storage-providers";
import { HttpProviderDependencies } from "@context/http-providers/http-providers";
import { ChatRoomRepositoryDependency } from "./chat-room";
import { PostingRepositoryDependency } from "./posting";
import { AuthRepository } from "data/repository/auth-repository";
import { UserRepositoryDependency } from "./user";

export class RepositoryDependencies {
  private readonly chatRoom: ChatRoomRepositoryDependency;
  private readonly posting: PostingRepositoryDependency;
  private readonly auth: AuthRepository;
  private readonly user: UserRepositoryDependency;

  constructor(
    apies: HttpProviderDependencies,
    storage: StorageProviderDependencies
  ) {
    this.chatRoom = new ChatRoomRepositoryDependency(apies.getChannel());
    this.posting = new PostingRepositoryDependency(apies.getPost());
    this.auth = new AuthRepository(apies.getAuth(), storage.getJwtLocal());
    this.user = new UserRepositoryDependency(apies.getUser());
  }

  getChatRoom() {
    return this.chatRoom;
  }

  getPosting() {
    return this.posting;
  }

  getAuth() {
    return this.auth;
  }

  getUser() {
    return this.user;
  }
}
