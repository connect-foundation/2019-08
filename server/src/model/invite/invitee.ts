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
    const invite = await Invite.findOneOrFail( {relations: ["user"], where: {ticket: ticket.asObject(), deletedAt: IsNull()}});
    const joinedInvitation = await Invite.save(invite.prepareDeleted());
    if(agree) {
      const profile = Profile.builder(joinedInvitation.snug, joinedInvitation.user).build();
      const savedProfile = await Profile.save(profile);
      const participant = new Participant();
      await participant.joinDefaultRoom(savedProfile);
    }

    return SnugInfo.fromSnug(joinedInvitation.snug);
  }

  async findInvitationByTicket(ticket: Ticket): Promise<SnugInfo> {
    const invite = await Invite.findOne({where: {ticket: ticket.asObject()}});
    return SnugInfo.fromSnug(invite.snug);
  }
}