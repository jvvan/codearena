import socket from "#services/socket.js";

async function bootstrap() {
  console.log("Starting runner...");

  socket.on("connected", (data) => {
    console.log(data);
  });

  socket.on("connect_error", (error) => {
    console.error(error);
  });
}

bootstrap();
