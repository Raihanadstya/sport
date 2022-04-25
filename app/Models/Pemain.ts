import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Tim from './Tim'

export default class Pemain extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public posisi: string

  @column()
  public nomorPunggung: string

  @column()
  public foto?: string

  @column()
  public userId: number
  
  @column()
  public timId: number

  @belongsTo(() => Tim, {
    localKey: "id"
  })
  public tims: BelongsTo<typeof Tim>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
