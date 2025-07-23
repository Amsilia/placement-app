import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sites'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('logo1').nullable()
      table.string('logo2').nullable()
      table.string('subline').notNullable()
      table.string('hero_title').notNullable()
      table.string('hero_desc').notNullable()
      table.string('footer_desc').notNullable()
      table.string('address').notNullable()
      table.string('contact').notNullable()
      table.string('email').notNullable()
      table.string('url_instagram').notNullable()
      table.string('url_facebook').notNullable()
      table.string('url_linkedin').notNullable()
      table.string('url_x').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
