import {StorageProviderDependencies} from "@src/@context/storage-providers/storage-providers";
import {HttpProviderDependencies} from "@src/@context/http-providers/http-providers";
import {ChatRoomRepositoryDependency} from "@src/@context/repositories/chat-room";

export class RepositoryDependencies {
    private readonly chatRoom: ChatRoomRepositoryDependency;

    constructor(
        apies: HttpProviderDependencies,
        storage: StorageProviderDependencies
    ) {
        this.chatRoom = new ChatRoomRepositoryDependency(apies.getChannel());

    }

}
