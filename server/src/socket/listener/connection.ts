import SocketIO from "socket.io";
import * as room from "../action/room";
import {CONSUME_EVENT} from "../common/events/consume-type";

export const connect = (io: SocketIO.Server) => {
  const roomIo = io.of("/room");
  const userIo = io.of("/user");

  roomIo.on(CONSUME_EVENT.CONNECTION, (socket: SocketIO.Socket) => {
    const req = socket.request;
    const { headers: { referer } } = req;
    console.log(`${socket.id} ${referer} 클라이언트 접속`);

    const profileId: string = null;
    room.join(socket, profileId);

    socket.on(CONSUME_EVENT.DISCONNECTION, () => {
      console.log(`${socket.id} ${referer} 클라이언트 나감`);
      room.leave(socket, profileId);
    });
  });

  userIo.on(CONSUME_EVENT.CONNECTION, (socket: SocketIO.Socket) => {
    const req = socket.request;
    const { headers: { referer } } = req;
    console.log(`${socket.id} ${referer} 클라이언트 접속`);

    socket.on("login", ({userId}) => {
      socket.join(userId);
      socket.on(CONSUME_EVENT.DISCONNECTION, () => {
        console.log(`${socket.id} ${referer} 클라이언트 나감`);
        socket.leave(userId);
      });
    });
  });
};