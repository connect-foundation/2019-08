

import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./Profile";
import {Snug} from "./Snug";
import {Base} from "./Base";

@Entity()
export class Room extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  isPrivate: boolean;

  @Column()
  isChannel: boolean;

  @ManyToOne(type => Profile)
  creator: Profile;

  @ManyToOne(type => Snug)
  snug: Snug;

  static findByTitle(title: string): Promise<Room> {
    return Room.findOne({where: {title: title}});
  }
}