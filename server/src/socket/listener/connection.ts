import SocketIO from "socket.io";
import * as room from "../action/room";

export const connect = (io: SocketIO.Server) => {
  io.on("connection", (socket: SocketIO.Socket) => {
    const req = socket.request;
    const { headers: { referer } } = req;
    console.log(`${socket.id} ${referer} 클라이언트 접속`);

    const profileId: string = null;
    room.join(socket, profileId);

    socket.on("disconnect", () => {
      console.log(`${socket.id} ${referer} 클라이언트 나감`);
      room.leave(socket, profileId);
    });
  });

};