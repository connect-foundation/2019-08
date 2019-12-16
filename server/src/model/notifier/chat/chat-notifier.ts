import {Notifier} from "../notifier";
import {Post} from "../../../domain/entity/Post";
import ResponseForm from "../../../utils/response-form";
import {publishIO} from "../../../socket/socket-manager";

export abstract class ChatNotifier implements Notifier<Post> {
  public send(post: Post): boolean {
    return publishIO()
            .of("/snug")
            .to(this.getRoom())
            .emit(this.getEvent(), ResponseForm.of<Post>(this.getMessage(), post));
  }

  public abstract getRoom(): string;

  public abstract getEvent(): string;

  public abstract getMessage(): string;
}