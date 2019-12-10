import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Snug} from "./Snug";
import {User} from "./User";
import {Base} from "./Base";

export type UserRoleType = "admin" | "member";

@Entity()
export class Profile extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: "enum",
    enum: ["admin", "member"]
  })
  role: UserRoleType;

  @ManyToOne(type => Snug)
  snug: Snug;

  @ManyToOne(type => User)
  user: User;

  static build(builder: Builder): Profile {
    const profile = new Profile();
    profile.name = builder.getName();
    profile.status = builder.getStatus();
    profile.description = builder.getDescription();
    profile.role = builder.getRole();
    profile.snug = builder.getSnug();
    profile.user = builder.getUser();
    return profile;
  }

  static builder(snug: Snug, user: User): Builder {
    return new Builder(snug, user);
  }
}

class Builder {
  private readonly snug: Snug;
  private readonly user: User;

  private name: string;
  private status: string;
  private description: string;
  private role: UserRoleType;

  constructor(snug: Snug, user: User) {
    this.snug = snug;
    this.user = user;
    this.name = user.name;
    this.status = "";
    this.description = "";
    this.role = "member";
  }

  build(): Profile {
    return Profile.build(this);
  }

  addName(name: string) {
    this.name = name;
    return this;
  }

  addStatus(status: string) {
    this.status = status;
    return this;
  }

  addDescription(description: string) {
    this.description = description;
    return this;
  }

  addRole(role: UserRoleType) {
    this.role = role;
    return this;
  }

  getName() {
    return this.name;
  }

  getStatus() {
    return this.status;
  }

  getDescription() {
    return this.description;
  }

  getRole() {
    return this.role;
  }

  getSnug() {
    return this.snug;
  }

  getUser() {
    return this.user;
  }
}