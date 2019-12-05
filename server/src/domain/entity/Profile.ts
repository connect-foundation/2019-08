import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Snug} from "./Snug";
import {User} from "./User";
import {Base} from "./Base";

export type UserRoleType = "admin" | "participant";

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
}