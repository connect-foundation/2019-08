import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./Base";

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
