import { Exception } from "@adonisjs/core/exceptions";

export default class RunnerLimitExceededException extends Exception {
  static status = 403;
  static code = "E_RUNNER_LIMIT_EXCEEDED";
  static message = "You have reached the maximum number of runners.";
}
