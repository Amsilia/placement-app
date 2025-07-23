import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected schemaName = 'order'
  protected tableName = 'transactions'

  public async up () {
    this.schema.withSchema(this.schemaName).alterTable(this.tableName, (table) => {
      table.text('payment_url').nullable()
    })
  }

  public async down () {
    this.schema.withSchema(this.schemaName).alterTable(this.tableName, (table) => {
      table.dropColumn('payment_url')
    })
  }
}
