export type UserRoleType = "admin" | "participant";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Profile } from "./Profile";
import { Snug } from "./Snug";

@Entity()
export class Room extends BaseEntity {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => Profile)
  creator: Profile;

  @ManyToOne(type => Snug)
  snug: Snug;
}
