import { DateTime } from "luxon";
import { BaseModel, column, hasOne } from "@adonisjs/lucid/orm";
import Language from "./language.js";
import type { HasOne } from "@adonisjs/lucid/types/relations";
import { InvocationStatus } from "../types/invocation.js";
import User from "#app/auth/models/user";

export default class Invocation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare userId: number;

  @column()
  declare status: InvocationStatus;

  @column()
  declare code: string;

  @column()
  declare languageId: string;

  @hasOne(() => Language)
  declare language: HasOne<typeof Language>;

  @hasOne(() => User)
  declare user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
