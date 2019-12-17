import SocketIO from "socket.io";
import { PUBLISH_EVENT } from "../../socket/common/events/publish-type";
import ResponseForm from "../../utils/response-form";
import { InviteInfo } from "../../model/invite/invite-info";
import { publishIO } from "../socket-manager";

export const tellInvitation = (userId: number, invite: InviteInfo): boolean => {
  try {
    return publishIO()
      .of("/user")
      .in(userId.toString())
      .emit(
        PUBLISH_EVENT.TELL_INVITATION,
        ResponseForm.of<InviteInfo>("tell invite", invite)
      );
  } catch (error) {
    console.error(error);
    return false;
  }
};
