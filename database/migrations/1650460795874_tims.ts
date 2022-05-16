import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Tims extends BaseSchema {
  protected tableName = "tims";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("nama_tebal", 150).notNullable();
      table.string("nama", 150).notNullable();
      table.string("asal_instansi", 100).notNullable();
      table.text("deskripsi").nullable();
      table.text("logo").nullable();
      table.integer("user_id").unsigned().notNullable();
      table.string("provinsi");
      table.string("wilayah");
      table.string("website");
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
