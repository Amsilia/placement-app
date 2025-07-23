import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Package from './Package'
import Price from './Price'
import Registrant from '../Order/Registrant'

export default class Batch extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public package_id: string

  @column()
  public batch_number: string

  @column()
  public is_active: boolean

  @column()
  public start_date: Date;

  @column()
  public end_date: Date;

  @column.dateTime()
  public open_at: DateTime;

  @column.dateTime()
  public close_at: DateTime;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;


  static get table() {
    return "package.batches" // table name
  }

  @beforeCreate()
  public static generateUuid(batch: Batch) {
    batch.id = uuid()
  }

  @belongsTo(() => Package, {
    foreignKey: 'package_id'
  })
  public package: BelongsTo<typeof Package>

  @hasMany(() => Price, {
    foreignKey: 'batch_id'
  })
  public prices: HasMany<typeof Price>

  @hasManyThrough([() => Registrant, () => Price], {
    foreignKey: 'batch_id',
    throughForeignKey: 'price_id',
    throughLocalKey: 'id',
  })
  public registrants: HasManyThrough<typeof Registrant>
}
