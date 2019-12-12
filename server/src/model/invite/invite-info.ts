import { Invite } from "../../domain/entity/Invite";
import UrlInfo from "../../utils/url-info";
import _ from "lodash";

export class InviteInfo {
  private id: number;
  private email: string;
  private snug: string;
  private link: string;
  private createdAt: Date;

  private constructor(
    id: number,
    email: string,
    snug: string,
    link: string,
    createdAt: Date
  ) {
    this.id = id;
    this.email = email;
    this.snug = snug;
    this.link = link;
    this.createdAt = createdAt;
  }

  static fromInvite(invite: Invite): InviteInfo {
    const { id, ticket, createdAt, email, snug } = invite;
    const link = UrlInfo.aboutApiVerification(ticket.getValue());
    return new InviteInfo(id, email.asFormat(), snug.name, link, createdAt);
  }
}

export const toInvitations = (invitations: Invite[]): InviteInfo[] => {
  return _.map(invitations, InviteInfo.fromInvite);
};
