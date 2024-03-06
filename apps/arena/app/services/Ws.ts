import server from "@adonisjs/core/services/server";
import redis from "@adonisjs/redis/services/main";
import { Namespace, Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import {
  UsersClientToServerEvents,
  UsersInterServerEvents,
  UsersServerToClientEvents,
  UsersSocketData,
} from "types/socket/users.js";
import {
  RunnersClientToServerEvents,
  RunnersInterServerEvents,
  RunnersServerToClientEvents,
  RunnersSocketData,
} from "types/socket/runner.js";

class Ws {
  public io: Server;

  public users: Namespace<
    UsersClientToServerEvents,
    UsersServerToClientEvents,
    UsersInterServerEvents,
    UsersSocketData
  >;

  public runners: Namespace<
    RunnersClientToServerEvents,
    RunnersServerToClientEvents,
    RunnersInterServerEvents,
    RunnersSocketData
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

    this.users = this.io.of("/users");
    this.runners = this.io.of("/runners");
  }
}

export default new Ws();
