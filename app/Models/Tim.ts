import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Pemain from './Pemain'

export default class Tim extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nama: string

  @column()
  public asalInstansi: string
  
  @column()
  public deskripsi?: string
  
  @column()
  public logo?: string
  
  @column()
  public userId: number

  @hasMany(() => Pemain, {
    foreignKey: "id"
  })
  public pemains: HasMany<typeof Pemain>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
    validated: Promise<{ nama: string; asalInstansi: string; deskripsi: string | undefined }>
    tim: { nama: string; asalInstansi: string; deskripsi: string | undefined }
}
