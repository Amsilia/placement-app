import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected schemaName = 'package'
  protected tableName = 'batches'

  public async up () {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('package_id').references('id').inTable('package.packages').onDelete('RESTRICT')
      table.string('batch_number').notNullable()
      table.boolean('is_active').defaultTo(false)
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.dateTime('open_at').notNullable()
      table.datetime('close_at').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName).withSchema(this.schemaName)
  }
}
