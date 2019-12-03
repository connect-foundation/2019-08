import {InviteRepositoryType} from "core/use-case/invite-repository-type";
import {EmailModel} from "core/model/email-model";

export class InviteService {
  private repository: InviteRepositoryType;

  constructor(inviteRepository: InviteRepositoryType) {
    this.repository = inviteRepository;
  }

  async send(snugId: string, emailModels: EmailModel[]): Promise<boolean> {
    try {
      const emails = this.transferToString(emailModels);
      return await this.repository.send(snugId, emails);
    } catch (error) {
      return false;
    }
  }

  private transferToString(emails: EmailModel[]): string[] {
    return emails.map(email => email.toString());
  }
}
