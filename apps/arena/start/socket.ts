import User from "#models/user";
import Ws from "#services/Ws";
import encryption from "@adonisjs/core/services/encryption";
import { EncryptedTokenPayload } from "types/auth.js";

Ws.boot();

Ws.io.use(async (socket, next) => {
  const token =
    socket.handshake.auth.token || socket.handshake.headers.authorization;
  if (!token) {
    return next(new Error("Unauthorized"));
  }
  const payload = encryption.decrypt(token) as EncryptedTokenPayload | null;
  if (
    !payload ||
    payload.purpose !== "socket.io" ||
    typeof payload.userId !== "number"
  ) {
    return next(new Error("Unauthorized"));
  }

  const user = await User.find(payload.userId);

  if (!user) {
    return next(new Error("Unauthorized"));
  }

  socket.data.user = user;

  next();
});

Ws.io.on("connection", (socket) => {
  socket.emit("user", socket.data.user);
});
