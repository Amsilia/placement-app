import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Package from './Package'
import Registrant from '../Order/Registrant'
import Batch from './Batch'

export default class Price extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public package_id: string

  @column()
  public batch_id: string

  @column()
  public name: string

  @column()
  public icon: string

  @column()
  public description: string

  @column()
  public amount: number

  @column()
  public special_condition: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "package.prices" // table name
  }

  @beforeCreate()
  public static generateUuid(price: Price) {
    price.id = uuid()
  }

  @belongsTo(() => Package, {
    foreignKey: 'package_id'
  })
  public package: BelongsTo<typeof Package>

  @belongsTo(() => Batch, {
    foreignKey: 'batch_id'
  })
  public batch: BelongsTo<typeof Batch>

  @hasMany(() => Registrant, {
    foreignKey: 'price_id',
    localKey: 'id'
  })
  public registrants: HasMany<typeof Registrant>
}
