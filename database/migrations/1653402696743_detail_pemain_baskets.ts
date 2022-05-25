import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DetailPemainBaskets extends BaseSchema {
  protected tableName = 'detail_pemain_baskets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("tinggi_badan", 3);
      table.integer("berat_badan", 3);
      table.string("tempat_lahir");
      table.string("pendidikan");
      table
        .integer("pemain_id")
        .unsigned()
        .references("id")
        .inTable("pemains")
        .onDelete("CASCADE");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
