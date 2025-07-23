import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Batch from './Batch'
import Price from './Price'

export default class Package extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "package.packages" // table name
  }

  @beforeCreate()
  public static generateUuid(paket: Package) {
    paket.id = uuid()
  }

  @hasMany(() => Batch, {
    foreignKey: 'package_id',
    localKey: 'id'
  })
  public batches: HasMany<typeof Batch>

  @hasMany(() => Price, {
    foreignKey: 'package_id',
    localKey: 'id'
  })
  public prices: HasMany<typeof Price>
}
