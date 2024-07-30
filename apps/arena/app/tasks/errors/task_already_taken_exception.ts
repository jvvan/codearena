import { Exception } from "@adonisjs/core/exceptions";

export default class TaskAlreadyTakenException extends Exception {
  static status = 403;
  static code = "E_TASK_ALREADY_TAKEN";
  static message = "Task has already been taken by another runner.";
}
