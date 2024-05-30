import { DateTime } from "luxon";
import { BaseModel, column, hasOne } from "@adonisjs/lucid/orm";
import Language from "./language.js";
import type { HasOne } from "@adonisjs/lucid/types/relations";

export default class Invocation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare code: string;

  @column()
  declare languageId: string;

  @hasOne(() => Language)
  declare language: HasOne<typeof Language>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
