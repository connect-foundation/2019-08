import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Base} from "./Base";

@Entity()
export class Channel extends Base {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("char", { length: 30 })
  name: string;
  @Column("varchar", { length: 300 })
  description: string;
  @Column("boolean", {default: false})
  privacy: boolean;

  static findByName(name: string): Promise<Channel> {
    return Channel.findOne({where: {name: name}});
  }
}