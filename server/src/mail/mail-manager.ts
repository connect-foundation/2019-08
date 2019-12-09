import nodemailer, {Transporter} from "nodemailer";
import {isNotEmpty} from "../utils/array-helper";
import {Invite} from "../domain/entity/Invite";

export class MailManager {
  private static readonly MAX_TRY_COUNT = 5;
  private static readonly IDLE_EVENT = "idle";
  private readonly transporter;
  private static manager: MailManager;
  private readonly queue = [];

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

  subscribes(): void {
    const sender = process.env.MIAL_SENDER!;
    this.transporter.on(MailManager.IDLE_EVENT, this.handleIdleEvent.bind(this, sender));
  }

  handleIdleEvent(sender: string): void {
    while (this.transporter.isIdle() && isNotEmpty(this.queue)) {
      const invite = this.queue.shift();
      this.send(sender, invite, 0);
    }
  }

  private async send(sender: string, invite: Invite, tryCount: number): Promise<void> {
    if(tryCount < MailManager.MAX_TRY_COUNT) {
      try {
        await invite.email.sendTo(this.transporter, sender, invite.provideContents());
        console.log(invite.email.asFormat(), ":", tryCount + " 시도 전송 성공");
      } catch (error) {
        console.error(invite.email.asFormat(), ":", tryCount + " 시도 전송 실패");
        this.send(sender, invite, tryCount + 1);
      }
    }
  }

  static initializeMailManger(): MailManager {
    return MailManager.manager = new MailManager();
  }

  private add(items: Invite[]): number {
    return this.queue.push(...items);
  }

  static publish(items: Invite[]): boolean {
    MailManager.manager.add(items);
    return MailManager.manager.transporter.emit(MailManager.IDLE_EVENT);
  }
}

export const initializeMailManger = MailManager.initializeMailManger;

export const publish = MailManager.publish;