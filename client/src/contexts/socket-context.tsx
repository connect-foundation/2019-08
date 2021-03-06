import React, { createContext } from "react";
import socketIO from "socket.io-client";

const userSocket = socketIO(
  process.env.REACT_APP_SOCKET_SERVER_HOST! + "/user",
  {
    transports: ["websocket"]
  }
);

const snugSocket = socketIO(
  process.env.REACT_APP_SOCKET_SERVER_HOST! + "/snug",
  {
    transports: ["websocket"]
  }
);

const socket = {
  userSocket,
  snugSocket
};

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
