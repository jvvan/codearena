import Ws from "#app/core/services/Ws";
import encryption from "@adonisjs/core/services/encryption";
import { EncryptedTokenPayload } from "../types/token.js";
import User from "../models/user.js";

Ws.users.use(async (socket, next) => {
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
