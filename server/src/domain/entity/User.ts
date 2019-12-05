import {Column, Entity, In, PrimaryGeneratedColumn} from "typeorm";
import {Base} from "./Base";
import {Email} from "../vo/Email";
import _ from "lodash";

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(type=> Email)
  email: Email;

  @Column()
  password: string;

  constructor(email?: Email) {
    super();
    this.email = email;
  }

  static findByEmails(emails: string[]): Promise<User[]> {
    const emailValues = emails.map(email => new Email(email));
    return User.find({ email: In(emailValues) });
  }

  hasSameEmail(email: string): boolean {
    return _.isEqual(this.email.asFormat(), email);
  }
}
