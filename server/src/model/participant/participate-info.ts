import _ from "lodash";
import {Room} from "../../domain/entity/Room";
import {ProfileInfo} from "../profile/profile-info";
import {ParticipateIn} from "../../domain/entity/ParticipateIn";

export class ParticipateInfo {
  private readonly room: Room;
  private readonly participant: ProfileInfo;

  private constructor(room: Room, profile: ProfileInfo) {
    this.room = _.cloneDeep(room);
    this.participant = _.cloneDeep(profile);
  }

  static fromParticipateIn(participateIn: ParticipateIn): ParticipateInfo {
    const {room, participant} = participateIn;
    const participantInfo = ProfileInfo.fromProfile(participant);
    return new ParticipateInfo(room, participantInfo);
  }

  public getRoom(): Room {
    return this.room;
  }

  public getParticipantInfo(): ProfileInfo {
    return this.participant;
  }
}