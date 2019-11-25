import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Profile } from "./Profile";
import { Room } from "./Room";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contents: string;

  @Column()
  imgSrc: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 생성자
  @ManyToOne(
    type => Profile,
    profile => profile.posts
  )
  owner: Profile;

  // 소속된 Room
  @ManyToOne(
    type => Room,
    room => room.posts
  )
  room: Room;

  // parent는 여러개의 child를 갖는다.
  @OneToMany(
    type => Post,
    post => post.child
  )
  parent: Post;

  // child는 하나의 parent를 가는다.
  @ManyToOne(
    type => Post,
    post => post.parent
  )
  child: Post[];
}
