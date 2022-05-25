import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Pemain from './Pemain';

export default class DetailPemainFutsal extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tinggiBadan: number;

  @column()
  public beratBadan: number;

  @column()
  public tempatLahir: string;

  @column()
  public pendidikan: string;

  @column()
  public foot: string;

  @column()
  public pemainId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Pemain, { localKey: "id", foreignKey: "pemainId" })
  public pemain: BelongsTo<typeof Pemain>;
}
