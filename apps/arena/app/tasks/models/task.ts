import Runner from "#app/runners/models/runner";
import { BaseModel, column, hasOne } from "@adonisjs/lucid/orm";
import type { HasOne } from "@adonisjs/lucid/types/relations";
import { DateTime } from "luxon";
import { TaskStatus, TaskType } from "../types/task.js";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare type: TaskType;

  @column()
  declare status: TaskStatus;

  @column()
  declare runnerId: number | null;

  @hasOne(() => Runner)
  declare runner: HasOne<typeof Runner>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
