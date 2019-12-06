import {Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EmailContents} from "../../template/email-contents";
import UrlInfo from "../../utils/url-info";
import {Base} from "./Base";
import {Email} from "../vo/Email";
import {User} from "./User";
import {Snug} from "./Snug";

@Entity()
export class Invite extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  ticket: string;

  @Column(type=> Email)
  email: Email;

  @ManyToOne(type => User)
  user: User;

  @ManyToOne(type => Snug, snug => snug.invitations)
  snug: Snug;

  constructor(user: User, snug: Snug) {
    super();
    this.user = user;
    this.snug = snug;
    if(this.user) {
      this.email = user.email;
    }
  }

  public isUnsignedUser(): boolean {
    return !this.user.id;
  }

  public provideContents(): string {
    const link = this.isUnsignedUser() ? UrlInfo.aboutRegister() : UrlInfo.aboutVerification(this.ticket);
    return EmailContents.getTemplate(this.snug.name, link);
  }

  public static findOneWithSnugByTicket(ticket: string): Promise<Invite> {
    return Invite.findOne({where: {ticket: ticket}, relations: ["snug"]});
  }

}