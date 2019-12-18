import nodemailer, {Transporter} from "nodemailer";
import {isNotEmpty} from "../utils/array-helper";
import {Email} from "../domain/vo/Email";
import _ from "lodash";

export class MailManager {
  private static readonly MAX_TRY_COUNT = 5;
  private static readonly FIRST_TRY_COUNT = 0;
  private static readonly IDLE_EVENT = "idle";
  private readonly transporter;
  private static manager: MailManager;

  constructor() {
    this.transporter = this.setUp();
    this.subscribes();
  }

  private setUp(): Transporter {
    const port = Number(process.env.MAIL_PORT);
    const secure = Boolean(process.env.MAIL_SECURE);
    return nodemailer.createTransport({
      pool: true,
      maxConnections: parseInt(process.env.MAIL_POOL_SIZE),
      host: process.env.MAIL_HOST,
      port: port,
      secure: secure,
      auth: {
        user: process.env.MAIL_ADMIN,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  private subscribes(): void {
    const sender = process.env.MIAL_SENDER;
    const emailEventHandler = (emails: Email[]) => this.handleIdleEvent(sender, emails);
    this.transporter.on(MailManager.IDLE_EVENT, emailEventHandler);
  }

  private hasAvailableTransporter(transporter: Transporter, emails: Email[]): boolean {
    return transporter.isIdle() && isNotEmpty(emails);
  }

  private handleIdleEvent(sender: string, emails: Email[]): void {
    const cloneEmails = _.cloneDeep<Email[]>(emails);
    while (this.hasAvailableTransporter(this.transporter, cloneEmails)) {
      const email = cloneEmails.shift();
      this.send(sender, email, MailManager.FIRST_TRY_COUNT);
    }
  }

  private haveNotReachedLimit(tryCount: number) {
    return tryCount < MailManager.MAX_TRY_COUNT;
  }

  private async send(sender: string, email: Email, tryCount: number): Promise<void> {
    if (this.haveNotReachedLimit(tryCount)) {
      try {
        await email.sendTo(this.transporter, sender);
      } catch (error) {
        this.send(sender, email, tryCount + 1);
      }
    }
  }

  public static initializeMailManger(): MailManager {
    return MailManager.manager = new MailManager();
  }

  public static publish(emails: Email[]): boolean {
    const cloneEmails = _.cloneDeep<Email[]>(emails);
    return MailManager.manager.transporter.emit(MailManager.IDLE_EVENT, cloneEmails);
  }
}

export const initializeMailManger = MailManager.initializeMailManger;
export const publish = MailManager.publish;