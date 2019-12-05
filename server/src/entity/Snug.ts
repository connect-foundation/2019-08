import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./Base";

@Entity()
export class Snug extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  description: string;
}
