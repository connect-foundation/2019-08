import { Invite } from "core/entity/invite";

export interface InviteRepositoryType {
  send(snugId: string, emails: string[]): Promise<boolean>;

  getInvitedSnugs(userId: number): Promise<Invite[] | boolean>;

  responseToInvitation(invitation: Invite, agree: boolean): Promise<Invite | boolean>;
}
