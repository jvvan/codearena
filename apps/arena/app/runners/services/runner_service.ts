import User from "#app/auth/models/user";
import { Infer } from "@vinejs/vine/types";
import Runner from "../models/runner.js";
import { runnersCreateValidator } from "../validators/runners.js";
import db from "@adonisjs/lucid/services/db";
import RunnerLimitExceededException from "../exceptions/runner_limit_exceeded_exception.js";
import stringHelpers from "@adonisjs/core/helpers/string";

export class RunnerService {
  public async findForUser(user: User, owned = false) {
    return Runner.query().withScopes((scopes) =>
      scopes.accessibleBy(user, owned)
    );
  }

  public async findAccessible(user: User, id: number) {
    return Runner.query()
      .where("id", id)
      .withScopes((scopes) => scopes.accessibleBy(user))
      .firstOrFail();
  }

  public async create(
    user: User,
    payload: Infer<typeof runnersCreateValidator>
  ) {
    const owned = await db
      .query<{ count: number }>()
      .from("runners")
      .where("owner_id", user.id)
      .count("id as count")
      .firstOrFail();

    if (owned.count >= 1 && !user.admin) {
      throw new RunnerLimitExceededException();
    }

    return Runner.create({
      name: payload.name,
      ownerId: user.id,
      public: false,
      token: stringHelpers.random(64),
    });
  }
}
