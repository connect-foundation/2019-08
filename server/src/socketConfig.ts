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

        const profileId: string = null;
        joinRoom(socket, profileId);

        socket.on("disconnect", () => {
            console.log(`${socket.id} ${referer} 클라이언트 나감`);
        });
    });
};


/**
 * request에 포함된 profile id를 기반으로 
 * profileId가 참여하고 있는 Room에 조인한다.
 */
async function joinRoom(socket: SocketIO.Socket, profileId: string) {
    try{
        const rooms = await Room.find();
        
        rooms.forEach(room => {
            socket.join(`${room.id}`);
        });
    } catch(error) {
        console.error(error);
    }
    // try{
    //     const rooms = await Room.find({
    //         where: { id: profileId }
    //     });
    //         rooms.forEach(room => {
    //             socket.join(`${room.id}`);
    //         });
    // } catch(error) {
    //     console.error(error);
    // }
}