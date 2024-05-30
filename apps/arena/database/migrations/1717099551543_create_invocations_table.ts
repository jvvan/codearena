import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "invocations";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string("id").primary();
      table.text("code").notNullable();
      table.string("language_id").notNullable().references("languages.id");

      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
