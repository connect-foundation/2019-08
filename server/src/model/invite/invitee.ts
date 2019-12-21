import {Invite} from "../../domain/entity/Invite";
import {InviteInfo, toInvitations} from "./invite-info";
import {Ticket} from "../../domain/vo/Ticket";
import {Profile} from "../../domain/entity/Profile";
import {Participant} from "../participant/participant";
import {IsolationLevel, Propagation, Transactional} from "typeorm-transactional-cls-hooked";
import {SnugInfo} from "../../model/snug/snug-info";
import {User} from "../../domain/entity/User";
import _ from "lodash";

export class Invitee {
  async findInvitations(userId: number): Promise<InviteInfo[]> {
    const invitations = await Invite.findByUserId(userId);
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

  @Transactional({propagation: Propagation.REQUIRED, isolationLevel: IsolationLevel.REPEATABLE_READ})
  async subscribeInvitations(user: User): Promise<Invite[]> {
    const invitations = await Invite.findByEmail(user.email);
    const invitationsAboutSubscriber = _.map(invitations, invite => invite.mergeUser(user));
    return Invite.save(invitationsAboutSubscriber);
  }
}