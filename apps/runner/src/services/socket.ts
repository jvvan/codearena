import { io } from "socket.io-client";
import config from "./config.js";

const socketUrl = `${config.get("runner.url")}/runners`;
const socket = io(socketUrl, {
  auth: {
    id: config.get("runner.id"),
    token: config.get("runner.token"),
  },
});

export default socket;
