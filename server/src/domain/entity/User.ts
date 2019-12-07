import {Any, Column, Entity, Equal, In, PrimaryGeneratedColumn} from "typeorm";
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
  name: string;

  @Column()
  password: string;

  constructor(email?: Email) {
    super();
    this.email = email;
  }

  static findByEmails(emails: string[]): Promise<User[]> {
    const emailOptions = emails
            .map(Email.build)
            .map(email => email.asObject())
            .map(email => {return {email};});

    return User.find({where: emailOptions});
  }

  hasSameEmail(email: string): boolean {
    return _.isEqual(this.email.asFormat(), email);
  }
}
