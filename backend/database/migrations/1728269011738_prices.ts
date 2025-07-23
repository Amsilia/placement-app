import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected schemaName = 'package'
  protected tableName = 'prices'

  public async up () {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('package_id').references('id').inTable('package.packages').onDelete('RESTRICT')
      table.uuid('batch_id').references('id').inTable('package.batches').onDelete('RESTRICT')
      table.string('name').notNullable()
      table.string('icon').nullable()
      table.integer('amount').notNullable()
      table.string('special_condition').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName).withSchema(this.schemaName)
  }
}
