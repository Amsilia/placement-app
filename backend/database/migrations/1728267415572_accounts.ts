import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected schemaName = 'user'
  protected tableName = 'account'

  public async up () {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('urole_id').references('id').inTable('user.role')
      table.string('username').notNullable()
      table.string('password').notNullable()
      table.string('email').notNullable().unique()
      table.string('google_id').nullable()
      table.string('fullname').notNullable()
      table.string('avatar').nullable()
      table.boolean('is_ban').defaultTo(false)
      table.boolean('is_verified').defaultTo(false)
      table.string('no_handphone').nullable()
      table.enum('gender', ['L', 'P']).nullable()
      table.date('birth_date').nullable()
      table.string('document').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName).withSchema(this.schemaName)
  }
}
