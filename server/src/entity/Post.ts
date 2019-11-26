import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Base} from "./Base";
import {Channel} from "./Channel";

@Entity()
export class Post extends Base {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("text")
  contents: string;
  @Column("varchar", { length: 150 })
  imgSrc: string;
  @ManyToOne(type => Channel)
  @JoinColumn()
  channel: Channel;

  static findByChannelId(id: string): Promise<Post[]> {
    return this.find({ where: {channel: id}});
  }
}