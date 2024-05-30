export enum TaskType {
  invocation = 0,
}

export enum TaskStatus {
  queued = 0,
  running = 1,
  completed = 2,
  failed = 3,
  cancelled = 4,
}
