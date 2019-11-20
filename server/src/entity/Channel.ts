import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

/**
 *
 * Channel Entity
 *
 **/
@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  privacy: boolean;
}