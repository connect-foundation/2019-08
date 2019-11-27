import { Server } from "http";
import { Express } from "express";
import { Room } from "./entity/Room";
import SocketIO  from "socket.io";
import { join } from "path";


export default function socketConfig(server: Server, app: Express) {
    const io = SocketIO(server, {
        path: "socket.io"
    });

    app.set("io", io);
    
    io.on("connection", (socket: SocketIO.Socket) => {
        const req = socket.request;
        const { headers: { referer } } = req;
        console.log(`${socket.id} ${referer} 클라이언트 접속`);

        socket.on("disconnect", () => {
            console.log(`${socket.id} ${referer} 클라이언트 나감`);
        });
    });
};
