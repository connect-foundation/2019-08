import {StorageProviderDependencies} from "@context/storage-providers/storage-providers";
import {HttpProviderDependencies} from "@context/http-providers/http-providers";
import {ChatRoomRepositoryDependency} from "./chat-room";

export class RepositoryDependencies {
  private readonly chatRoom: ChatRoomRepositoryDependency;

  constructor(
          apies: HttpProviderDependencies,
          storage: StorageProviderDependencies
  ) {
    this.chatRoom = new ChatRoomRepositoryDependency(apies.getChannel());
  }

  getChatRoom() {
    return this.chatRoom;
  }
}
