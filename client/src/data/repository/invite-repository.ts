import {InviteRepositoryType} from "core/use-case/invite-repository-type";
import {InviteApi} from "data/http/api/invite-api";

export class InviteRepository implements InviteRepositoryType {
  private readonly inviteApi: InviteApi;

  constructor(inviteApi: InviteApi) {
    this.inviteApi = inviteApi;
  }

  async send(emails: string[]): Promise<boolean> {
    return await this.inviteApi.sendEmails(emails);
  }

}
