import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Klasemens extends BaseSchema {
  protected tableName = 'klasemens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('bermain').notNullable()
      table.integer('menang').notNullable()
      table.integer('kalah').notNullable()
      table.integer('seri').notNullable()
      table.integer('poin').notNullable()
      table
        .integer('tim_id')
        .unsigned()
        .references('id')
        .inTable('tims')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
