import Runner from "#models/runner";
import Ws from "#services/Ws";
import logger from "@adonisjs/core/services/logger";

Ws.runners.use(async (socket, next) => {
  const id = socket.handshake.auth.id || socket.handshake.headers.id;
  const token = socket.handshake.auth.token || socket.handshake.headers.token;

  if (!id || !token) {
    return next(new Error("Unauthorized"));
  }

  const runner = await Runner.find(id);
  if (!runner || runner.token !== token) {
    return next(new Error("Unauthorized"));
  }

  socket.data.runner = runner;

  next();
});

Ws.runners.on("connection", (socket) => {
  logger.info("Runner connected: %s [%s]", socket.data.runner.id, socket.id);
  socket.emit("connected", socket.data.runner);
});
