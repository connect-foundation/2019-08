import {Invite} from "../../domain/entity/Invite";
import {IsNull} from "typeorm";
import {toInvitations, InviteInfo} from "./invite-info";

export class Invitee {
  async findInvitations(userId: string): Promise<InviteInfo[]> {
    const invitations = await Invite.find({where: {user: userId, deletedAt: IsNull()}});
    return toInvitations(invitations);
  }
}