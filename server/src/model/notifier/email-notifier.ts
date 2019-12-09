import {Notifier} from "./notifier";
import {publish} from "../../mail/mail-manager";
import {Invite} from "../../domain/entity/Invite";

export class EmailNotifier implements Notifier<Invite[]> {
  send(invitations: Invite[]): boolean {
    publish([...invitations]);
    return true;
  }
}