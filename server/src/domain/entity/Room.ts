import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./Profile";
import {Snug} from "./Snug";
import {Base} from "./Base";
import {Order} from "../../controller/api/common/order";

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

  static findPublicChannelBySnugId(snugId: number): Promise<Room[]> {
    return Room.find({ where: { snug: snugId, isChannel: true, isPrivate: false } });
  }

  static findDefaultChannelBySnug(snug: Snug): Promise<Room> {
    const order = new Order()
            .add("id", "ASC")
            .support();
    return Room.findOneOrFail({where: {isPrivate: false, isChannel: true, snug: snug}, ...order});
  }

  static findChannelById(id: number): Promise<Room> {
    return Room.findOneOrFail(id);
  }
}