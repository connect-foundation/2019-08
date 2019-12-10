import {Room} from "../../domain/entity/Room";
import SocketIO from "socket.io";

const takeId = (room: Room): string => room.id.toString();

/**
 * request에 포함된 profile id를 기반으로
 * profileId가 참여하고 있는 Room에 조인한다.
 */
export const join = async (socket: SocketIO.Socket, profileId: string): Promise<void> => {
  try {
    const rooms = await Room.find();
    rooms.map(takeId)
            .forEach(roomId => {
              socket.join(roomId);

            });
  } catch (error) {
    console.error(error);
  }
};

/**
 * request에 포함된 profile id를 기반으로
 * profileId가 참여하고 있는 Room에 나간다.
 */
export const leave = async (socket: SocketIO.Socket, profileId: string): Promise<void> => {
  try {
    const rooms = await Room.find();
    rooms.map(takeId)
            .forEach(roomId => {
              socket.leave(roomId);
            });
  } catch (error) {
    console.error(error);
  }
};