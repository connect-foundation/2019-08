import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, OneToMany} from "typeorm";
import {Profile} from './Profile';
import { Post } from "./Post";


@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    isPrivate: string;

    @Column()
    isChannel: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // 생성자
    @ManyToOne(type => Profile, profile => profile.myRooms)
    owner: Profile;

    // 참여자
    @ManyToMany(type => Profile, profile => profile.rooms)
    participants: Profile[];

    // 게시된 Post 목록
    @OneToMany(type => Post, post => post.room)
    posts: Post[];
}