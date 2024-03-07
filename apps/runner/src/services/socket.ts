import { io } from "socket.io-client";
import config from "./config.js";

const socket = io("http://localhost:3333/runners", {
  auth: {
    id: config.get("runner.id"),
    token: config.get("runner.token"),
  },
});

export default socket;
