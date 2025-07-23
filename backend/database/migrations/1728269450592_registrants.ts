import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected schemaName = 'order'
  protected tableName = 'registrants'

  public async up () {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id')
      table.uuid('price_id')
      table.uuid('status_id').references('id').inTable('order.registrant_statuses').onDelete('RESTRICT')
      table.integer('price').notNullable()
      table.string('fullname').notNullable()
      table.tinyint('age').notNullable()
      table.string('no_handphone').notNullable()
      table.enum('employment_status', ['belum bekerja', 'pelajar/mahasiswa', 'bekerja']).nullable()
      table.string('institution').nullable()
      table.enum('last_education', ['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3']).nullable()
      table.string('document').nullable()
      table.string('transfer_proof').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName).withSchema(this.schemaName)
  }
}
