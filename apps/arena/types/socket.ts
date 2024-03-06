import User from "#models/user";

export interface SocketData {
  user: User;
}

export interface ClientToServerEvents {}
export interface ServerToClientEvents {
  user: (user: User) => void;
}
export interface InterServerEvents {}
