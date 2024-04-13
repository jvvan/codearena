import Ws from "#app/core/services/Ws";

Ws.users.on("connection", (socket) => {
  socket.emit("connected", socket.data.user);
});
