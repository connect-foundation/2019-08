import {Profile} from "../../domain/entity/Profile";
import {Room} from "../../domain/entity/Room";
import {ParticipateIn} from "../../domain/entity/ParticipateIn";
import {IsolationLevel, Propagation, Transactional} from "typeorm-transactional-cls-hooked";

export class Participant {

  @Transactional({propagation: Propagation.REQUIRED, isolationLevel: IsolationLevel.REPEATABLE_READ})
  public async joinDefaultRoom(profile: Profile): Promise<ParticipateIn> {
    const participateIn = new ParticipateIn();
    participateIn.participant = profile;
    participateIn.room = await Room.findOneOrFail({where: {isPrivate: false, isChannel: true, snug: profile.snug}, order: {id: "ASC"}});
    return await ParticipateIn.save(participateIn);
  }
}