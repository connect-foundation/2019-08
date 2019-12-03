import {InviteRepositoryType} from "core/use-case/invite-repository-type";
import {EmailModel} from "core/model/email-model";

export class InviteService {
  private repository: InviteRepositoryType;

  constructor(inviteRepository: InviteRepositoryType) {
    this.repository = inviteRepository;
  }

  private addEmailIfNotDuplicated(emails: string[], email: string): string[] {
    if(!emails.includes(email)) {
      return emails.concat(email);
    }

    return emails;
  }

  private transferToString(emails: EmailModel[]): string[] {
    return emails.filter(email => email.hasEmail())
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
}
