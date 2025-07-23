import { DateTime } from 'luxon'
import { BaseModel, beforeFetch, beforeFind, BelongsTo, belongsTo, column, HasMany, hasMany, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Article from '../Public/Article'
import { v4 as uuid } from 'uuid'
import Registrant from '../Order/Registrant'
export default class Account extends BaseModel {
  public static softDelete = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public urole_id: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public email: string

  @column()
  public google_id: string

  @column()
  public fullname: string

  @column()
  public avatar: string

  @column()
  public is_ban: boolean

  @column()
  public is_verified: boolean

  @column()
  public no_handphone: string

  @column()
  public gender: string

  @column.date({
    serialize: (value: DateTime) => value ? value.toFormat('yyyy-MM-dd') : null,
  })
  public birth_date: DateTime

  @column()
  public document: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime

  static get table() {
    return "user.account"
  }

  @beforeFind()
  public static findWithoutSoftDeletes(query: any) {
    query.whereNull("deleted_at")
  }

  @beforeFetch()
  public static fetchWithoutSoftDeletes(query) {
    query.whereNull("deleted_at")
  }

  @beforeCreate()
  public static generateUuid(account: Account) {
    account.id = uuid()
  }
  @belongsTo(() => Role, {
    foreignKey: 'urole_id'
  })
  public role: BelongsTo<typeof Role>

  @hasMany(() => Article, {
    foreignKey: 'user_id',
    localKey: 'id'
  })
  public articles: HasMany<typeof Article>

  @hasMany(() => Registrant, {
    foreignKey: 'user_id',
    localKey: 'id'
  })
  public registrants: HasMany<typeof Registrant>
}
