import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Snug} from "./Snug";
import {User} from "./User";
import {Base} from "./Base";

export type UserRoleType = "admin" | "member";

@Entity()
export class Profile extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 64})
  name: string;

  @Column({nullable: true, length: 128})
  status: string;

  @Column({nullable: true, length: 256, default: "/image/default-thumbnail.jpeg"})
  thumbnail: string;

  @Column({nullable: true, length: 512})
  description: string;

  @Column({nullable: true})
  phone: string;

  @Column({
    type: "enum",
    enum: ["admin", "member"],
    default: "member"
  })
  role: UserRoleType;

  @ManyToOne(type => Snug)
  snug: Snug;

  @ManyToOne(type => User)
  @JoinColumn({referencedColumnName: "id"})
  user: User;

  static async hasProfileByUserId(profileId: string, userId: number): Promise<boolean> {
    const user = User.create({id: userId});
    const profile = await Profile.findOne({where: {id: profileId, user: user}});
    return profile && profile.hasId();
  }

  static findById(profileId: string): Promise<Profile> {
    return Profile.findOne(profileId, {relations: ["user"]});
  }

  static build(builder: Builder): Profile {
    const profile = new Profile();
    profile.name = builder.getName();
    profile.status = builder.getStatus();
    profile.thumbnail = builder.getThumbnail();
    profile.description = builder.getDescription();
    profile.phone = builder.getPhone();
    profile.role = builder.getRole();
    profile.snug = builder.getSnug();
    profile.user = builder.getUser();
    return profile;
  }

  static builder(snug?: Snug, user?: User): Builder {
    return new Builder(snug, user);
  }
}

class Builder {
  private readonly snug: Snug;
  private readonly user: User;
  private name: string;
  private status: string;
  private thumbnail: string;
  private description: string;
  private phone: string;
  private role: UserRoleType;

  constructor(snug: Snug, user: User) {
    this.snug = snug;
    this.user = user;
    this.name = user && user.name;
  }

  build(): Profile {
    return Profile.build(this);
  }

  addName(name: string): Builder {
    this.name = name;
    return this;
  }

  addStatus(status: string): Builder {
    this.status = status;
    return this;
  }

  addThumbnail(thumbnail: string): Builder {
    this.thumbnail = thumbnail;
    return this;
  }

  addDescription(description: string): Builder {
    this.description = description;
    return this;
  }

  addPhone(phone: string): Builder {
    this.phone = phone;
    return this;
  }

  addRole(role: UserRoleType): Builder {
    this.role = role;
    return this;
  }

  getName(): string {
    return this.name;
  }

  getStatus(): string {
    return this.status;
  }

  getThumbnail(): string {
    return this.thumbnail;
  }

  getDescription(): string {
    return this.description;
  }

  getPhone(): string {
    return this.phone;
  }

  getRole(): UserRoleType {
    return this.role;
  }

  getSnug(): Snug {
    return this.snug;
  }

  getUser(): User {
    return this.user;
  }
}