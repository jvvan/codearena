import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import { RunnerService } from "../services/runner_service.js";
import { runnersCreateValidator } from "../validators/runners.js";

@inject()
export default class RunnersController {
  public constructor(private runnerService: RunnerService) {}

  public async index({ auth, request }: HttpContext) {
    const user = await auth.use("web").getUserOrFail();
    const owned = request.input("owned", "false") === "true";

    return this.runnerService.findForUser(user, owned);
  }

  public async show({ auth, params }: HttpContext) {
    const user = await auth.use("web").getUserOrFail();

    return this.runnerService.findAccessible(user, params.id);
  }

  public async store({ auth, request }: HttpContext) {
    const user = await auth.use("web").getUserOrFail();
    const payload = await request.validateUsing(runnersCreateValidator);

    return this.runnerService.create(user, payload);
  }
}
