import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "testimonies";
  protected schemaName = "user";
  public async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("employment").notNullable();
      table.text("content").notNullable();
      table.string("image").notNullable();
      table.boolean("is_published").defaultTo(false);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName).withSchema(this.schemaName);
  }
}
