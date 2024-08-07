import { DateTime } from "luxon";
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import hash from "@adonisjs/core/services/hash";
import { compose } from "@adonisjs/core/helpers";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import Runner from "#app/runners/models/runner";
import Invocation from "#app/tasks/models/invocation";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
  uids: ["username", "email"],
  passwordColumnName: "password",
});

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare username: string;

  @column()
  declare email: string | null;

  @column({ serializeAs: null })
  declare password: string;

  @column()
  declare admin: boolean;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;

  @hasMany(() => Runner)
  declare runner: HasMany<typeof Runner>;

  @hasMany(() => Invocation)
  declare invocations: HasMany<typeof Invocation>;
}
