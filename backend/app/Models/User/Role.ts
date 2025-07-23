import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Account from './Account'
import { v4 as uuid } from 'uuid'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public code: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "user.role"
  }

  @beforeCreate()
  public static generateUuid(role: Role) {
    role.id = uuid()
  }

  @hasOne(() => Account)
  public account: HasOne<typeof Account>
}
