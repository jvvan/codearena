import Runner from "#models/runner";
import Ws from "#services/Ws";

Ws.runners.use(async (socket, next) => {
  const auth =
    socket.handshake.auth.token || socket.handshake.headers.authorization;
  if (!auth) {
    return next(new Error("Unauthorized"));
  }

  const [id, token] = auth.split(":");

  const runner = await Runner.find(id);
  if (!runner || runner.token !== token) {
    return next(new Error("Unauthorized"));
  }

  socket.data.runner = runner;

  next();
});

Ws.runners.on("connection", (socket) => {
  socket.emit("connected", socket.data.runner);
});
