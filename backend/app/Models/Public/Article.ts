import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Account from '../User/Account'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public slug: string

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public image: string

  @column()
  public visitor: number

  @column()
  public is_published: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "articles" // table name
  }

  @beforeCreate()
  public static generateUuid(article: Article) {
    article.id = uuid()
  }

  @beforeCreate()
  public static generateSlug(article: Article) {
    article.slug = article.title.toLowerCase().replace(/ /g, '-')
  }

  @belongsTo(() => Account, {
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof Account>
}
