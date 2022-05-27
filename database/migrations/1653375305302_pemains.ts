import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Pemains extends BaseSchema {
  protected tableName = "pemains";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("posisi", 50);
      table.string("nomor_punggung", 3);
      table.string("nickname");
      table.string("deskripsi");
      table.text("foto").nullable();
      table.integer("user_id").unsigned().notNullable();
      table
        .integer("tim_id")
        .unsigned()
        .references("id")
        .inTable("tims")
        .onDelete("CASCADE");
      table.string("facebook");
      table.string("twitter");
      table.string("instagram");
      table.string("youtube");
      table.string("tiktok");
      table.boolean("dihapus").defaultTo(0);
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
