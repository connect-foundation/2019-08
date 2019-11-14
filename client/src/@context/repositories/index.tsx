import {StorageProviderDependencies} from "../storage-providers/storage-providers";
import {HttpProviderDependencies} from "../http-providers/http-providers";
import {ChatRoomRepositoryDependency} from "./chat-room";

export class RepositoryDependencies {
    public chatRoom: ChatRoomRepositoryDependency;

    constructor(
        apies: HttpProviderDependencies,
        storage: StorageProviderDependencies
    ) {
        this.chatRoom = new ChatRoomRepositoryDependency(apies.channel);

    }

}
