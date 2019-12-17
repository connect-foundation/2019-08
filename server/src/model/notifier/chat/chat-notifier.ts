import { Notifier } from "../notifier";
import { Post } from "../../../domain/entity/Post";
import ResponseForm from "../../../utils/response-form";
import { sendMessage } from "../../../socket/action/snug";
import { PostInfo } from "../../chat/post-info";

export abstract class ChatNotifier implements Notifier<Post> {
  public send(post: Post): boolean {
    return sendMessage(
      this.getRoom(),
      this.getEvent(),
      this.getMessage(),
      PostInfo.fromPost(post)
    );
  }

  public abstract getRoom(): string;

  public abstract getEvent(): string;

  public abstract getMessage(): string;
}
