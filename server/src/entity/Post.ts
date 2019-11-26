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

  @Column({ nullable: true })
  contents: string;

  @Column({ nullable: true })
  imgSrc: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => Profile)
  profile: Profile;

  @ManyToOne(type => Room)
  room: Room;

  @ManyToOne(
    type => Post,
    post => post.childCategories
  )
  parentCategory: Post;

  @OneToMany(
    type => Post,
    post => post.parentCategory
  )
  childCategories: Post[];
}
