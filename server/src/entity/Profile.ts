export type UserRoleType = "admin" | "participant";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  BaseEntity
} from "typeorm";
import { Room } from "./Room";
import { Post } from "./Post";

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  thumbnail: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: ["admin", "participant"]
  })
  role: UserRoleType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  // 생성한 room 목록
  @OneToMany(
    type => Room,
    room => room.owner
  )
  myRooms: Room[];

  // 참여하고 있는 room 목록
  @ManyToMany(
    type => Room,
    room => room.participants
  )
  rooms: Room[];

  // 작성한 Post 목록
  @OneToMany(
    type => Post,
    post => post.owner
  )
  posts: Post[];
}
