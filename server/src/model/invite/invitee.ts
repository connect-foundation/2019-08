import {Invite} from "../../domain/entity/Invite";
import {IsNull} from "typeorm";
import {InviteInfo, toInvitations} from "./invite-info";
import {Ticket} from "../../domain/vo/Ticket";
import {Profile} from "../../domain/entity/Profile";
import {Participant} from "../participant/participant";
import {IsolationLevel, Propagation, Transactional} from "typeorm-transactional-cls-hooked";
import {SnugInfo} from "../../model/snug/snug-info";

export class Invitee {
  async findInvitations(userId: string): Promise<InviteInfo[]> {
    const invitations = await Invite.find({where: {user: userId, deletedAt: IsNull()}});
    return toInvitations(invitations);
  }

  @Transactional({propagation: Propagation.REQUIRED, isolationLevel: IsolationLevel.REPEATABLE_READ})
  async joinSnug(ticket: Ticket, agree: boolean): Promise<SnugInfo> {
    const invite = await Invite.findWithUserByTicket(ticket);
    const joinedInvitation = await Invite.deleteBy(invite);
    if (agree) {
      const profile = Profile.builder(joinedInvitation.snug, joinedInvitation.user).build();
      const joinedProfile = await Profile.save(profile);
      const participant = new Participant();
      await participant.joinDefaultRoom(joinedProfile);
    }

    return SnugInfo.fromSnug(joinedInvitation.snug);
  }

  async findInvitationByTicket(ticket: Ticket): Promise<SnugInfo> {
    const invite = await Invite.findByTicket(ticket);
    return SnugInfo.fromSnug(invite.snug);
  }
}