import {Profile} from "../../domain/entity/Profile";
import {Room} from "../../domain/entity/Room";
import {ParticipateIn} from "../../domain/entity/ParticipateIn";
import {IsolationLevel, Propagation, Transactional} from "typeorm-transactional-cls-hooked";

export class Participant {
  @Transactional({propagation: Propagation.REQUIRED, isolationLevel: IsolationLevel.REPEATABLE_READ})
  public async joinDefaultRoom(profile: Profile): Promise<ParticipateIn> {
    console.error(profile);
    const participateIn = new ParticipateIn();
    participateIn.participant = profile;
    participateIn.room = await Room.findDefaultChannelBySnug(profile.snug);
    return await ParticipateIn.save(participateIn);
  }
}