import Runner from "#app/runners/models/runner";
import { errors, symbols } from "@adonisjs/auth";
import { AuthClientResponse, GuardContract } from "@adonisjs/auth/types";
import { HttpContext } from "@adonisjs/core/http";

export class RunnerGuard implements GuardContract<Runner> {
  declare [symbols.GUARD_KNOWN_EVENTS]: {};
  driverName: "runner" = "runner";
  authenticationAttempted: boolean = false;
  isAuthenticated: boolean = false;
  runner?: Runner;

  public constructor(private ctx: HttpContext) {}

  async generate(runner: Runner) {
    return runner.token;
  }

  async authenticate(): Promise<Runner> {
    if (this.authenticationAttempted) {
      return this.getUserOrFail();
    }
    this.authenticationAttempted = true;

    const authHeader = this.ctx.request.header("authorization");
    if (!authHeader) {
      throw new errors.E_UNAUTHORIZED_ACCESS("Unauthorized access", {
        guardDriverName: this.driverName,
      });
    }

    const [, token] = authHeader.split(" ");
    if (!token) {
      throw new errors.E_UNAUTHORIZED_ACCESS("Unauthorized access", {
        guardDriverName: this.driverName,
      });
    }

    const runner = await Runner.findBy("token", token);
    if (!runner) {
      throw new errors.E_UNAUTHORIZED_ACCESS("Unauthorized access", {
        guardDriverName: this.driverName,
      });
    }

    this.runner = runner;
    return this.getUserOrFail();
  }

  async check(): Promise<boolean> {
    try {
      await this.authenticate();
      return true;
    } catch {
      return false;
    }
  }

  getUserOrFail(): Runner {
    if (!this.runner) {
      throw new errors.E_UNAUTHORIZED_ACCESS("Unauthorized access", {
        guardDriverName: this.driverName,
      });
    }

    return this.runner;
  }

  async authenticateAsClient(runner: Runner): Promise<AuthClientResponse> {
    const token = await this.generate(runner);
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  }
}
