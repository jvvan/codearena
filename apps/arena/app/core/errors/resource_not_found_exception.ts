import { Exception } from "@adonisjs/core/exceptions";

export default class ResourceNotFoundException extends Exception {
  static status = 404;
  static code = "E_RESOURCE_NOT_FOUND";

  public constructor(resource: string) {
    super(`${resource} not found.`);
  }
}
