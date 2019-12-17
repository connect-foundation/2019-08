import { ResponseEntity } from "./../http/api/response/ResponseEntity";
import { InviteRepositoryType } from "core/use-case/invite-repository-type";
import { InviteApi } from "data/http/api/invite-api";
import { Invite } from "core/entity/invite";

export class InviteRepository implements InviteRepositoryType {
  private readonly inviteApi: InviteApi;

  constructor(inviteApi: InviteApi) {
    this.inviteApi = inviteApi;
  }

  async send(snugId: string, emails: string[]): Promise<boolean> {
    return await this.inviteApi.sendEmails(snugId, emails);
  }

  async getInvitedSnugs(userId: number): Promise<Invite[] | boolean> {
    try {
      const responseEntity = await this.inviteApi.getInvitedSnugs(userId);
      if (!responseEntity) return false;
      return (responseEntity as ResponseEntity<Invite[]>).payload;
    } catch (error) {
      return false;
    }
  }

  async responseToInvitation(
    invitation: Invite,
    agree: boolean
  ): Promise<Invite | boolean> {
    try {
      const responseEntity = await this.inviteApi.responseToInvitation(
        invitation,
        agree
      );
      if (!responseEntity) return false;
      return (responseEntity as ResponseEntity<Invite>).payload;
    } catch (error) {
      return false;
    }
  }
}
