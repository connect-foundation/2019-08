import {Notifier} from "./notifier";
import {Email} from "../../domain/vo/Email";
import {publish} from "../../mail/mail-manager";
import {Invite} from "../../domain/entity/Invite";
import _ from "lodash";

export class EmailNotifier implements Notifier<Invite[]> {
  public send(invitations: Invite[]): boolean {
    const emails = _.map(invitations, this.addContentsToEmail);
    return publish([...emails]);
  }

  private addContentsToEmail(invite: Invite): Email {
    const {email} = invite;
    const cloneEmail = _.cloneDeep(email);
    cloneEmail.setUpContents(invite.provideContents());
    return cloneEmail;
  }
}