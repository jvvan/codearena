import User from "../models/user.js";

export interface UsersSocketData {
  user: User;
}

export interface UsersClientToServerEvents {}
export interface UsersServerToClientEvents {
  connected: (user: User) => void;
}
export interface UsersInterServerEvents {}
