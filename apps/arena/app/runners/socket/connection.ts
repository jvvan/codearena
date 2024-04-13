import Ws from "#app/core/services/Ws";
import logger from "@adonisjs/core/services/logger";

Ws.runners.on("connection", (socket) => {
  logger.info("Runner connected: %s [%s]", socket.data.runner.id, socket.id);
  socket.emit("connected", socket.data.runner);
});
