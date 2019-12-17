import {Column, Entity, Index, IsNull, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EmailContents} from "../../template/email-contents";
import UrlInfo from "../../utils/url-info";
import {Email} from "../vo/Email";
import {Ticket} from "../vo/Ticket";
import {Base} from "./Base";
import {User} from "./User";
import {Snug} from "./Snug";

@Entity()
@Index("invite_email_snug_uniq_index", ["snug.id", "email.localPart", "email.domain"], {unique: true})
export class Invite extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(type=> Ticket)
  ticket: Ticket;

  @Column(type=> Email)
  email: Email;

  @Column({nullable: true})
  deletedAt: Date;

  @ManyToOne(type => User)
  @JoinColumn({referencedColumnName: "id"})
  user: User;

  @ManyToOne(type => Snug, snug => snug.invitations, {eager: true})
  snug: Snug;

  constructor(user: User, snug: Snug) {
    super();
    this.user = user;
    this.snug = snug;
    this.ticket = Ticket.generate();
    if(this.user) {
      this.email = user.email;
    }
  }

  public isUnsignedUser(): boolean {
    return !this.user.id;
  }

  public provideContents(): string {
    if(this.isUnsignedUser()) {
      const registerLink = UrlInfo.aboutRegister();
      return EmailContents.getTemplateForRegister(this.snug.name, registerLink);
    } else {
      const verificationLink = UrlInfo.aboutVerification(this.ticket.getValue());
      return EmailContents.getTemplateForVerification(this.snug.name, verificationLink);
    }

  }

  public static findWithUserByTicket(ticket: Ticket): Promise<Invite> {
    return Invite.findOneOrFail({relations: ["user"], where: {ticket: ticket.asObject(), deletedAt: IsNull()}});
  }

  public static findByTicket(ticket: Ticket): Promise<Invite> {
    return Invite.findOne({where: {ticket: ticket.asObject()}});
  }

  public static findByEmail(email: Email): Promise<Invite[]> {
    return Invite.find({where: {email: email}});
  }

  public static findByUserId(userId: number): Promise<Invite[]> {
   return Invite.find({where: {user: userId, deletedAt: IsNull()}});
  }

  public static deleteBy(invite: Invite): Promise<Invite> {
    invite.deletedAt = new Date();
    return Invite.save(invite);
  }

  public mergeUser(user: User): Invite {
    return Invite.merge(this, {user: user});
  }
}