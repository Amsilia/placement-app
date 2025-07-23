import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Site extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public logo1: string 

  @column()
  public logo2: string

  @column()
  public subline: string

  @column()
  public hero_title: string

  @column()
  public hero_desc: string

  @column()
  public footer_desc: string

  @column()
  public address: string

  @column()
  public contact: string

  @column()
  public email: string

  @column()
  public url_instagram: string

  @column()
  public url_facebook: string

  @column()
  public url_linkedin: string

  @column()
  public url_x: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "sites" // table name
  }

  @beforeCreate()
  public static generateUuid(site: Site) {
    site.id = uuid()
  }
}
