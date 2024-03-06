import server from "@adonisjs/core/services/server";
import redis from "@adonisjs/redis/services/main";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "types/socket.js";

class Ws {
  public io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >;
  private booted = false;

  public boot() {
    if (this.booted) {
      return;
    }
    this.booted = true;
    this.io = new Server(server.getNodeServer(), {
      cors: {
        origin: "*",
      },
    });
    const ioredis = redis.connection().ioConnection;
    this.io.adapter(createAdapter(ioredis, ioredis));
  }
}

export default new Ws();
