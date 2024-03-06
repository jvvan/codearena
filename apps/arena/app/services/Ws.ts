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
import { RedisStore, instrument } from "@socket.io/admin-ui";
import app from "@adonisjs/core/services/app";
import { randomUUID } from "crypto";

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
    this.io.adapter(createAdapter(ioredis.duplicate(), ioredis.duplicate()));

    // Only add admin ui in development, for now
    if (app.inDev) {
      instrument(this.io, {
        serverId: `arena-${randomUUID()}`,
        auth: false,
        mode: app.inProduction ? "production" : "development",
        namespaceName: "socket-admin",
        store: new RedisStore(ioredis.duplicate()),
      });
    }

    this.users = this.io.of("/users");
    this.runners = this.io.of("/runners");
  }
}

export default new Ws();
