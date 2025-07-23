import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Transaction from './Transaction'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public transaction_id: string

  @column()
  public amount_paid: number

  @column()
  public installment_number: number

  @column()
  public transaction_status: string

  @column()
  public token: string

  @column()
  public redirect_url: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "order.payments" // table name
  }

  @beforeCreate()
  public static generateUuid(payment: Payment) {
    payment.id = uuid()
  }

  @belongsTo(() => Transaction, {
    foreignKey: 'transaction_id'
  })
  public transaction: BelongsTo<typeof Transaction>
}
