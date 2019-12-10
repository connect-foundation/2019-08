import SocketIO from "socket.io";
import {PUBLISH_EVENT} from "../../socket/common/events/publish-type";
import ResponseForm from "../../utils/response-form";
import {InviteInfo} from "../../model/invite/invite-info";

export const tellInvitation = (userId: number, invite: InviteInfo, userNamespace: SocketIO.Namespace): boolean => {
  try {
    return userNamespace.in(userId.toString())
            .emit(PUBLISH_EVENT.TELL_INVITATION, ResponseForm.of<InviteInfo>("tell invite", invite));
  } catch (error) {
    console.error(error);
    return false;
  }
};