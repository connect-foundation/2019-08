import {Column, Entity, IsNull, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EmailContents} from "../../template/email-contents";
import UrlInfo from "../../utils/url-info";
import {Email} from "../vo/Email";
import {Ticket} from "../vo/Ticket";
import {Base} from "./Base";
import {User} from "./User";
import {Snug} from "./Snug";

@Entity()
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
    const link = this.isUnsignedUser() ? UrlInfo.aboutRegister() : UrlInfo.aboutVerification(this.ticket.getValue());
    return EmailContents.getTemplate(this.snug.name, link);
  }

  public static findOneWithSnugByTicket(ticket: Ticket): Promise<Invite> {
    return Invite.findOne({where: {ticket: ticket.asObject(), deletedAt: IsNull()}});
  }

}