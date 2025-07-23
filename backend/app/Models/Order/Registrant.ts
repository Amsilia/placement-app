import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import RegistrantStatus from './RegistrantStatus'
import Transaction from './Transaction'
import Account from '../User/Account'
import Price from '../Package/Price'

export default class Registrant extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @column()
  public price_id: string

  @column()
  public status_id: string

  @column()
  public price: number

  @column()
  public fullname: string

  @column()
  public no_handphone: string

  @column()
  public age: number

  @column()
  public employment_status: string

  @column()
  public institution: string

  @column()
  public last_education: string

  @column()
  public document: string

  @column()
  public transfer_proof: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "order.registrants" // table name
  }

  @beforeCreate()
  public static generateUuid(registrant: Registrant) {
    registrant.id = uuid()
  }

  @belongsTo(() => RegistrantStatus, {
    foreignKey: 'status_id'
  })
  public status: BelongsTo<typeof RegistrantStatus>

  @belongsTo(() => Account, {
    foreignKey: 'user_id'
  })
  public account: BelongsTo<typeof Account>

  @belongsTo(() => Price, {
    foreignKey: 'price_id'
  })
  public cost: BelongsTo<typeof Price>

  @hasMany(() => Transaction, {
    foreignKey: 'registrant_id',
    localKey: 'id'
  })
  public transactions: HasMany<typeof Transaction>
}
