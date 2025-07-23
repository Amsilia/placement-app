import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('user_id').references('id').inTable('user.account').onDelete('RESTRICT')
      table.string('slug').notNullable().unique()
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.string('image').nullable()
      table.integer('visitor').defaultTo(0)
      table.boolean('is_published').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
