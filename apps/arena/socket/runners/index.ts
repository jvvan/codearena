import Runner from "#models/runner";
import Ws from "#services/Ws";

Ws.runners.use(async (socket, next) => {
  const token =
    socket.handshake.auth.token || socket.handshake.headers.authorization;
  if (!token) {
    return next(new Error("Unauthorized"));
  }

  const runner = await Runner.findBy("token", token);
  if (!runner) {
    return next(new Error("Unauthorized"));
  }

  socket.data.runner = runner;

  next();
});

Ws.runners.on("connection", (socket) => {
  socket.emit("connected", socket.data.runner);
});
