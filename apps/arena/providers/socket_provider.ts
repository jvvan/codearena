import type { ApplicationService } from "@adonisjs/core/types";

export default class SocketProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * The process has been started
   */
  async ready() {
    if (this.app.getEnvironment() === "web") {
      await import("../start/socket.js");
    }
  }
}
