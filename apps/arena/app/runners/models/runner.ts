import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, scope } from "@adonisjs/lucid/orm";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import User from "#app/auth/models/user";

export default class Runner extends BaseModel {
  static accessibleBy = scope((query, user: User, owned = false) => {
    if (user.admin && !owned) {
      return;
    }

    query.where("owner_id", user.id);
  });

  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare token: string;

  @column()
  declare public: boolean;

  @column()
  declare ownerId: number;

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
