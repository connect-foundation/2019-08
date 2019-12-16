import {ChatNotifier} from "./chat-notifier";
import {PUBLISH_EVENT} from "../../../socket/common/events/publish-type";
import {FOUND_POST_PROFILE} from "../../../controller/api/common/messages";

export class PostNotifier extends ChatNotifier{
  private readonly roomId: string;

  constructor(roomId: string) {
    super();
    this.roomId = roomId;
  }

  getEvent(): string {
    return PUBLISH_EVENT.SEND_MESSAGE;
  }

  getMessage(): string {
    return FOUND_POST_PROFILE;
  }

  getRoom(): string {
    return this.roomId;
  }
}