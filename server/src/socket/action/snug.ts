import { ParticipateIn } from "../../domain/entity/ParticipateIn";
import { Room } from "../../domain/entity/Room";
import SocketIO from "socket.io";
import { PostInfo } from "../../model/chat/post-info";
import ResponseForm from "../../utils/response-form";
import { publishIO } from "../socket-manager";

const takeId = (room: Room): string => room.id.toString();

/**
 * request에 포함된 profile id를 기반으로
 * profileId가 참여하고 있는 Room에 조인한다.
 */
export const join = async (
  socket: SocketIO.Socket,
  profileId: number
): Promise<void> => {
  try {
    const participantIns: ParticipateIn[] = await ParticipateIn.find({
      where: { participant: profileId },
      relations: ["room"]
    });
    participantIns.forEach((participantIn: ParticipateIn) => {
      const roomId = participantIn.room.id;
      socket.join(String(roomId));
      console.log(`프로필 ${profileId}가 방 ${roomId}에 접속`);
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * request에 포함된 profile id를 기반으로
 * profileId가 참여하고 있는 Room에 나간다.
 */
export const leave = async (
  socket: SocketIO.Socket,
  profileId: number
): Promise<void> => {
  try {
    const participantIns: ParticipateIn[] = await ParticipateIn.find({
      where: { participant: profileId },
      relations: ["room"]
    });
    participantIns.forEach((participantIn: ParticipateIn) => {
      const roomId = participantIn.room.id;
      socket.leave(String(roomId));
      console.log(`프로필 ${profileId}가 방 ${roomId}에 나감`);
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = (
  room: string,
  event: string,
  message: string,
  postInfo: PostInfo
): boolean => {
  try {
    return publishIO()
      .of("/snug")
      .in(room)
      .emit(event, ResponseForm.of<PostInfo>(message, postInfo));
  } catch (error) {
    console.error(error);
    return false;
  }
};
