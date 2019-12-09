import {Invite} from "../domain/entity/Invite";
import {Email} from "../domain/vo/Email";
import {Snug} from "../domain/entity/Snug";
import {User} from "../domain/entity/User";
import _ from "lodash";
import {Notifier} from "./notifier/notifier";

export class Inviter {
  private emailNotifier: Notifier<Invite>;
  private alarmNotifier: Notifier<Invite>;

  constructor(emailNotifier: Notifier<Invite>, alarmNotifier: Notifier<Invite>) {
    this.emailNotifier = emailNotifier;
    this.alarmNotifier = alarmNotifier;
  }

  async invite(snugId: string, emails: string[]): Promise<Invite[]> {
    const snug = await Snug.findOne(snugId);
    const users = await User.findByEmails(emails);
    const unsignedUsers = _.differenceWith(emails, users, (email, user) => user.hasSameEmail(email))
            .map(email => new Email(email))
            .map(email => new User(email));

    const userInvitations = this.transferToInvitations(users, snug);
    const invitations = _.union(userInvitations, this.transferToInvitations(unsignedUsers, snug));
    const savedInvitations = await Invite.save(invitations);

    this.emailNotifier.send(savedInvitations);
    this.alarmNotifier.send(userInvitations);
    return invitations;
  }

  private transferToInvitations(users: User[], snug: Snug): Invite[] {
    return _.map(users, (user) => new Invite(user, snug));
  }
}