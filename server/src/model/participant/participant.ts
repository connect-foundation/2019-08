import {Profile} from "../../domain/entity/Profile";
import {Room} from "../../domain/entity/Room";
import {ParticipateIn} from "../../domain/entity/ParticipateIn";
import {IsolationLevel, Propagation, Transactional} from "typeorm-transactional-cls-hooked";
import _ from "lodash";
import {ParticipateInfo} from "./participate-info";

export class Participant {
  @Transactional({propagation: Propagation.REQUIRED, isolationLevel: IsolationLevel.REPEATABLE_READ})
  public async joinDefaultRoom(profile: Profile): Promise<ParticipateIn> {
    const room = await Room.findDefaultChannelBySnug(profile.snug);
    const participateIn = new ParticipateIn(profile, room);
    return await ParticipateIn.save(participateIn);
  }

  @Transactional({propagation: Propagation.REQUIRED, isolationLevel: IsolationLevel.REPEATABLE_READ})
  public async joinRoom(profile: Profile, roomId: number): Promise<ParticipateInfo> {
    const room = await Room.findChannelById(roomId);
    const participateIn = await ParticipateIn.join(profile, room);
    return ParticipateInfo.fromParticipateIn(participateIn);
  }

  public async findChannelsAttending(participant: Profile, snugId: number): Promise<Room[]> {
    const participationInfos = await ParticipateIn.findWithRoomByParticipant(participant);
    return _.chain(participationInfos)
            .map(participationInfo => participationInfo.room)
            .filter(room => room.snug.isSameId(snugId))
            .filter(room => room.isChannel)
            .value();
  }

  public static findPublicChannels(snugId: number): Promise<Room[]> {
    return Room.findPublicChannelsBySnugId(snugId);
  }

  public async findChannels(participant: Profile, snugId: number): Promise<Room[]> {
    const publicChannels = Participant.findPublicChannels(snugId);
    const privateAttendingChannels = this.findChannelsAttending(participant, snugId);
    const  channels = await Promise.all([publicChannels, privateAttendingChannels])
    return _.flatten(channels);
  }
}