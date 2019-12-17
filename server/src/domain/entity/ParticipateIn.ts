import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Profile } from "./Profile";
import { Room } from "./Room";
import _ from "lodash";

@Entity()
export class ParticipateIn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Profile)
  participant: Profile;

  @ManyToOne(type => Room)
  room: Room;

  constructor(participant: Profile, room: Room) {
    super();
    this.participant = _.cloneDeep(participant);
    this.room = _.cloneDeep(room);
  }

  static findWithRoomByParticipant(participant: Profile): Promise<ParticipateIn[]> {
    return ParticipateIn.find({where: {participant}, relations: ["room"]});
  }
}
