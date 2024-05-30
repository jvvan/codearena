import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "languages";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.string("extension").notNullable();
      table.string("compile_command").notNullable();

      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
