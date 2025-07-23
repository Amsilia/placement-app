import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected schemaName = 'order'
  protected tableName = 'transactions'

  public async up () {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('registrant_id')
      table.string('order_id').notNullable()
      table.integer('gross_amount').notNullable()
      table.enum('payment_type', ['full', '6x', '12x']).notNullable() // tipe pembayaran
      table.integer('installment_total').nullable() // total berapa kali cicilan yang harus dibayar
      table.boolean('is_installment').defaultTo(false)
      table.boolean('is_finished').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName).withSchema(this.schemaName)
  }
}
