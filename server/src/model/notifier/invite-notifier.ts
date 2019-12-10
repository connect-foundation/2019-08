import {Notifier} from "./notifier";
import {Invite} from "../../domain/entity/Invite";
import {publishIO} from "../../socket/socket-manager";
import {tellInvitation} from "../../socket/action/invite";
import {InviteInfo} from "../../model/invite/invite-info";
import _ from "lodash";

export class InviteNotifier implements Notifier<Invite[]> {
  public send(invitations: Invite[]): boolean {
    return _.every(invitations, this.generate);
  }

  private generate(invite: Invite): boolean {
    const inviteInfo = InviteInfo.fromInvite(invite);
    return tellInvitation(invite.user.id, inviteInfo, publishIO().of("/user"));
  }
}