import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Registrant from './Registrant'
import Payment from './Payment'


export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public registrant_id: string

  @column()
  public order_id: string

  @column()
  public gross_amount: number

  @column()
  public payment_type: string

  @column()
  public installment_total: number

  @column()
  public is_installment: boolean

  @column()
  public is_finished: boolean

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column()
  public payment_url: string

  static get table() {
    return "order.transactions" // table name
  }

  @beforeCreate()
  public static generateUuid(transaction: Transaction) {
    transaction.id = uuid()
  }

  @belongsTo(() => Registrant, {
    foreignKey: 'registrant_id'
  })
  public registrant: BelongsTo<typeof Registrant>

  @hasMany(() => Payment, {
    foreignKey: 'transaction_id',
    localKey: 'id'
  })
  public payments: HasMany<typeof Payment>
}
