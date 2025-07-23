import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Registrant from './Registrant'

export default class RegistrantStatus extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public deleted_at: DateTime

  static get table() {
    return "order.registrant_statuses" // table name
  }

  @beforeCreate()
  public static generateUuid(status: RegistrantStatus) {
    status.id = uuid()
  }

  @hasMany(() => Registrant, {
    foreignKey: 'status_id',
    localKey: 'id'
  })
  public registrants: HasMany<typeof Registrant>
}
