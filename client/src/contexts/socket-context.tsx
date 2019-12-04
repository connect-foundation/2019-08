import { createContext } from "react";
import socketIO from "socket.io-client";

const socket = socketIO(process.env.REACT_APP_SOCKET_SERVER_HOST!);
export const globalSocket = createContext(socket);
