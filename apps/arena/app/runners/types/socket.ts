import Runner from "../models/runner.js";

export interface RunnersSocketData {
  runner: Runner;
}

export interface RunnersClientToServerEvents {}
export interface RunnersServerToClientEvents {
  connected: (runner: Runner) => void;
}
export interface RunnersInterServerEvents {}
