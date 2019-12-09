import { InviteRepositoryType } from "core/use-case/invite-repository-type";
import { EmailModel } from "core/model/email-model";
import { Invite } from "core/entity/invite";

export class InviteService {
  private repository: InviteRepositoryType;

  constructor(inviteRepository: InviteRepositoryType) {
    this.repository = inviteRepository;
  }

  private addEmailIfNotDuplicated(emails: string[], email: string): string[] {
    if (!emails.includes(email)) {
      return emails.concat(email);
    }

    return emails;
  }

  private transferToString(emails: EmailModel[]): string[] {
    return emails
      .filter(email => email.hasEmail())
      .map(email => email.toString())
      .reduce(this.addEmailIfNotDuplicated, []);
  }

  async send(snugId: string, emailModels: EmailModel[]): Promise<boolean> {
    try {
      const emails = this.transferToString(emailModels);
      return await this.repository.send(snugId, emails);
    } catch (error) {
      return false;
    }
  }

  async getInvitedSnugs(email: string): Promise<Invite[] | boolean> {
    return await this.repository.getInvitedSnugs(email);
  }

  async responseToInvitation(invitation: Invite): Promise<Invite | boolean> {
    return await this.repository.responseToInvitation(invitation);
  }
}
