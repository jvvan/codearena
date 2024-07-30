import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "tasks";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary();
      table.smallint("type").notNullable();
      table.smallint("status").notNullable();

      table
        .integer("runner_id")
        .unsigned()
        .references("runners.id")
        .onDelete("SET NULL");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
