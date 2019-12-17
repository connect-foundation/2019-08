import {Profile} from "../../domain/entity/Profile";
import {Room} from "../../domain/entity/Room";
import {ParticipateIn} from "../../domain/entity/ParticipateIn";
import {IsolationLevel, Propagation, Transactional} from "typeorm-transactional-cls-hooked";
import _ from "lodash";

export class Participant {
  @Transactional({propagation: Propagation.REQUIRED, isolationLevel: IsolationLevel.REPEATABLE_READ})
  public async joinDefaultRoom(profile: Profile): Promise<ParticipateIn> {
    const room = await Room.findDefaultChannelBySnug(profile.snug);
    const participateIn = new ParticipateIn(profile, room);
    return await ParticipateIn.save(participateIn);
  }

  public async findChannelsAttending(participant: Profile): Promise<Room[]> {
    const participationInfos = await ParticipateIn.findWithRoomByParticipant(participant);
    return _.chain(participationInfos)
            .map(participationInfo => participationInfo.room)
            .filter(room => room.isChannel)
            .value();
  }
}