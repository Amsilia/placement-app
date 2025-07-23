import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected schemaName = 'order'
  protected tableName = 'payments'

  public async up () {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('transaction_id').references('id').inTable('order.transactions').onDelete('RESTRICT')
      table.integer('amount_paid').notNullable()
      table.tinyint('installment_number').notNullable()
      table.enum('transaction_status', ['capture', 'settlement', 'pending', 'deny', 'cancel', 'expire', 'refund']).defaultTo('pending')
      table.string('token').nullable()
      table.string('redirect_url').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName).withSchema(this.schemaName)
  }
}
