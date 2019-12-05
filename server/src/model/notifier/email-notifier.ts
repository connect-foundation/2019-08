import {Notifier} from "./notifier";
import {Invite} from "../../domain/entity/invite";
import nodemailer from "nodemailer";
import _ from "lodash";

export class EmailNotifier implements Notifier<Invite> {
  send(invitations: Invite[]): boolean {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST!,
      port: parseInt(process.env.MAIL_PORT!),
      secure: !!process.env.MAIL_SECURE!,
      auth: {
        user: process.env.MAIL_ADMIN!,
        pass: process.env.MAIL_PASSWORD!
      }
    });

    return _.every(invitations, (invite: Invite) => {
      return invite.email.sendTo(transporter, invite.provideContents());
    });
  }
}