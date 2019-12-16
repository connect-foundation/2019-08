import {ChatNotifier} from "./chat-notifier";
import {PUBLISH_EVENT} from "../../../socket/common/events/publish-type";
import {SUCCESS_SEND_REPLY} from "../../../controller/api/common/messages";

export class ReplyNotifier extends ChatNotifier{
  private readonly roomId: string;

  constructor(roomId: string) {
    super();
    this.roomId = roomId;
  }

  getEvent(): string {
    return PUBLISH_EVENT.SEND_REPLY;
  }

  getMessage(): string {
    return SUCCESS_SEND_REPLY;
  }

  getRoom(): string {
    return this.roomId;
  }
}