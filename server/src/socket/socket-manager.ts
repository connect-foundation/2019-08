import http from "http";
import https from "https";
import SocketIO from "socket.io";
import {connect} from "./listener/connection";

class SocketManager {
  private readonly io: SocketIO.Server;
  private static socketManager: SocketManager;

  private constructor(io: SocketIO.Server) {
    this.io = io;
    this.setUp(io);
  }

  private setUp(io: SocketIO.Server): void {
    connect(io);
  }

  static build(server: http.Server | https.Server) {
    SocketManager.socketManager = new SocketManager(SocketIO(server));
  }

  static publishIO(): SocketIO.Server {
    return SocketManager.socketManager.io;
  }
}

export const initialize = SocketManager.build;

export const publishIO = SocketManager.publishIO;