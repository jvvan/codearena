import { inject } from "@adonisjs/core";
import { InvocationService } from "../services/invocation_service.js";
import { HttpContext } from "@adonisjs/core/http";
import { createInvocationValidator } from "../validators/invocations.js";

@inject()
export default class InvocationController {
  public constructor(private invocationService: InvocationService) {}

  public async store(ctx: HttpContext) {
    const user = ctx.auth.use("web").getUserOrFail();
    const payload = await ctx.request.validateUsing(createInvocationValidator);

    const invocation = await this.invocationService.create(user, payload);

    return invocation;
  }
}
