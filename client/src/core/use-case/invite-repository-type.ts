import { Invite } from "core/entity/invite";

export interface InviteRepositoryType {
  send(snugId: string, emails: string[]): Promise<boolean>;

  getInvitedSnugs(email: string): Promise<Invite[] | boolean>;
  responseToInvitation(invitation: Invite): Promise<Invite | boolean>;
}
