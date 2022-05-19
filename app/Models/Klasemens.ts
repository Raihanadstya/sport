import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo,BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Tim from './Tim'

export default class Klasemens extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bermain: number

  @column()
  public menang: number

  @column()
  public kalah: number

  @column()
  public seri: number

  @column()
  public poin: number

  @column()
  public timId: number

  @belongsTo(() => Tim, {
    localKey: "id",
    foreignKey: "timId"
  })
  public tims: BelongsTo<typeof Tim>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
