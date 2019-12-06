import {Notifier} from "./notifier";
import {Invite} from "../../domain/entity/invite";
import {publishIO} from "../../socket/socket-manager";
import {tellInvitation} from "../../socket/action/invite";
import _ from "lodash";

export class InviteNotifier implements Notifier<Invite> {
  public send(invitations: Invite[]): boolean {
    return _.every(invitations, this.generate);
  }

  private generate(invite: Invite): boolean {
    return tellInvitation(invite.user.id, invite.snug, publishIO().of("/user"));
  }
}