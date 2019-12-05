import SocketIO from "socket.io";
import {Snug} from "../../domain/entity/Snug";
import {PUBLISH_EVENT} from "../../socket/common/events/publish-type";
import ResponseForm from "../../utils/response-form";

export const tellInvitation = (userId: number, snug: Snug, userNamespace: SocketIO.Namespace): boolean => {
  try {
    return userNamespace.in(userId.toString())
            .emit(PUBLISH_EVENT.TELL_INVITATION, ResponseForm.of<Snug>("tell invite", snug));
  } catch (error) {
    console.error(error);
    return false;
  }
};