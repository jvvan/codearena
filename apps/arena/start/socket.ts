import Ws from "#services/Ws";
import app from "@adonisjs/core/services/app";

Ws.boot();

app.booted(async () => {
  await import("../socket/users/index.js");
  await import("../socket/runners/index.js");
});
