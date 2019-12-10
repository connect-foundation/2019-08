import React, { createContext, useContext } from "react";
import socketIO from "socket.io-client";

const socket = socketIO(process.env.REACT_APP_SOCKET_SERVER_HOST! + "/user", {
  transports: ["websocket"],
  upgrade: false
});
export const globalSocket = createContext(socket);

export const SocketContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <globalSocket.Provider value={socket}>{children}</globalSocket.Provider>
  );
};
