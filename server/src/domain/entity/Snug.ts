import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./Base";
import {Invite} from "./Invite";

@Entity()
export class Snug extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(type => Invite, invite => invite.snug)
  invitations: Invite[];

  public isSameId(targetId: number): boolean {
    return this.id === targetId;
  }
}
