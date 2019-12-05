import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Profile } from "./Profile";
import { Room } from "./Room";

@Entity()
export class ParticipateIn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Profile)
  participant: Profile;

  @ManyToOne(type => Room)
  room: Room;
}
