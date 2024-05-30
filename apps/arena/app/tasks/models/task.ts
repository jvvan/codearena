import { DateTime } from "luxon";
import { BaseModel, column, hasOne } from "@adonisjs/lucid/orm";
import User from "#app/auth/models/user";
import type { HasOne } from "@adonisjs/lucid/types/relations";
import { TaskStatus, TaskType } from "../types/task.js";
import Runner from "#app/runners/models/runner";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare type: TaskType;

  @column()
  declare status: TaskStatus;

  @column()
  declare info: string;

  @column()
  declare userId: number | null;

  @column()
  declare runnerId: number | null;

  @hasOne(() => User)
  declare user: HasOne<typeof User>;

  @hasOne(() => Runner)
  declare runner: HasOne<typeof Runner>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
