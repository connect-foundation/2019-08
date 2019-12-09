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

  setUp(): Transporter {
    return nodemailer.createTransport({
      pool: true,
      maxConnections: parseInt(process.env.MAIL_POOL_SIZE!),
      host: process.env.MAIL_HOST!,
      port: parseInt(process.env.MAIL_PORT!),
      secure: !!process.env.MAIL_SECURE!,
      auth: {
        user: process.env.MAIL_ADMIN!,
        pass: process.env.MAIL_PASSWORD!
      }
    });
  }

  private subscribes(): void {
    const sender = process.env.MIAL_SENDER!;
    this.transporter.on(MailManager.IDLE_EVENT, (emails: Email[]) => this.handleIdleEvent(sender, emails));
  }

  private handleIdleEvent(sender: string, emails: Email[]): void {
    const cloneEmails = _.cloneDeep<Email[]>(emails);
    while (this.transporter.isIdle() && isNotEmpty(cloneEmails)) {
      const email = cloneEmails.shift();
      this.send(sender, email, MailManager.FIRST_TRY_COUNT);
    }
  }

  private async send(sender: string, email: Email, tryCount: number): Promise<void> {
    if (tryCount < MailManager.MAX_TRY_COUNT) {
      try {
        await email.sendTo(this.transporter, sender);
        console.log(`${email.asFormat()} : ${tryCount} 시도 전송 성공`);
      } catch (error) {
        console.error(`${email.asFormat()} : ${tryCount} 시도 전송 실패`);
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