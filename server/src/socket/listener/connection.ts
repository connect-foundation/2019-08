import SocketIO from "socket.io";
import * as room from "../action/snug";
import { CONSUME_EVENT } from "../common/events/consume-type";
import { profile } from "winston";

export const connect = (io: SocketIO.Server) => {
  const snugIo = io.of("/snug");
  const userIo = io.of("/user");

  snugIo.on(CONSUME_EVENT.CONNECTION, (socket: SocketIO.Socket) => {
    const req = socket.request;
    const {
      headers: { referer }
    } = req;
    console.log(`${socket.id} ${referer} 클라이언트 접속`);

    socket.on(CONSUME_EVENT.ENTERSNUG, (profileID: number) => {
      room.join(socket, profileID);
    });

    socket.on(CONSUME_EVENT.LEAVESNUG, (profileID: number) => {
      room.leave(socket, profileID);
    });

    socket.on(CONSUME_EVENT.NEWJOIN, (profileId: number, channelId: number) => {
      socket.join(String(channelId));
    });

    socket.on(CONSUME_EVENT.DISCONNECTION, () => {
      console.log(`${socket.id} ${referer} 클라이언트 나감`);
    });
  });

  userIo.on(CONSUME_EVENT.CONNECTION, (socket: SocketIO.Socket) => {
    const req = socket.request;
    const {
      headers: { referer }
    } = req;
    console.log(`${socket.id} ${referer} 클라이언트 접속`);

    socket.on("login", ({ userId }) => {
      socket.join(userId);
      socket.on(CONSUME_EVENT.DISCONNECTION, () => {
        console.log(`${socket.id} ${referer} 클라이언트 나감`);
        socket.leave(userId);
      });
    });
  });
};
