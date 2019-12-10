import {Profile} from "../../domain/entity/Profile";
import {Room} from "../../domain/entity/Room";
import {ParticipateIn} from "../../domain/entity/ParticipateIn";
import {IsolationLevel, Propagation, Transactional} from "typeorm-transactional-cls-hooked";

export class Participant {
  @Transactional({propagation: Propagation.REQUIRED, isolationLevel: IsolationLevel.REPEATABLE_READ})
  public async joinDefaultRoom(profile: Profile): Promise<ParticipateIn> {
    const room = await Room.findDefaultChannelBySnug(profile.snug);
    const participateIn = new ParticipateIn(profile, room);
    return await ParticipateIn.save(participateIn);
  }
}