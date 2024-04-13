import Ws from "#app/core/services/Ws";
import app from "@adonisjs/core/services/app";

Ws.boot();

app.booted(async () => {
  await import("#app/auth/socket/index");
  await import("#app/runners/socket/index");
});
