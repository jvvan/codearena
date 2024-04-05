import socket from "#services/socket";

async function bootstrap() {
  socket.on("connected", (data) => {
    console.log(data);
  });
}

bootstrap();
