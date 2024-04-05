import RunnerLimitExceededException from "#exceptions/runners/runner_limit_exceeded_exception";
import Runner from "#models/runner";
import { runnersCreateValidator } from "#validators/runners";
import { HttpContext } from "@adonisjs/core/http";
import db from "@adonisjs/lucid/services/db";
import string from "@adonisjs/core/helpers/string";

export default class RunnersController {
  public async index({ auth, request }: HttpContext) {
    const user = await auth.getUserOrFail();
    const owned = request.input("owned", "false") === "true";

    return Runner.query().withScopes((scopes) =>
      scopes.accessibleBy(user, owned)
    );
  }

  public async show({ auth, params }: HttpContext) {
    const user = await auth.getUserOrFail();
    const runner = await Runner.query()
      .where("id", params.id)
      .withScopes((scopes) => scopes.accessibleBy(user))
      .firstOrFail();

    return runner;
  }

  public async store({ auth, request }: HttpContext) {
    const user = await auth.getUserOrFail();

    const owned = await db
      .query<{ count: number }>()
      .from("runners")
      .where("owner_id", user.id)
      .count("id as count")
      .firstOrFail();

    if (owned.count >= 1 && !user.admin) {
      throw new RunnerLimitExceededException();
    }

    const payload = await request.validateUsing(runnersCreateValidator);

    return Runner.create({
      name: payload.name,
      ownerId: user.id,
      public: false,
      token: string.random(64),
    });
  }
}
