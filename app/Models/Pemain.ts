import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import DetailPemainFutsal from "./DetailPemainFutsal";
import DetailPemainBasket from "./DetailPemainBasket";
import Tim from "./Tim";

export default class Pemain extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public posisi: string;

  @column()
  public nomorPunggung: string;

  @column()
  public nickname: string;

  @column()
  public deskripsi: string;

  @column()
  public foto?: string;

  @column()
  public userId: number;

  @column()
  public timId: number;

  @column()
  public facebook: string;

  @column()
  public twitter: string;

  @column()
  public instagram: string;

  @column()
  public youtube: string;

  @column()
  public tiktok: string;

  @column()
  public detailPemainFutsalId: number;

  @belongsTo(() => Tim, {
    localKey: "id",
    foreignKey: "timId",
  })
  public tim: BelongsTo<typeof Tim>;

  @hasOne(() => DetailPemainBasket, { localKey: "id", foreignKey: "pemainId" })
  public detailPemainBasket: HasOne<typeof DetailPemainBasket>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  validated: Promise<{
    posisi: string;
    nomorPunggung: string;
    nickname: string;
    deskripsi: string;
  }>;
  pemain: {
    posisi: string;
    nomorPunggung: string;
    nickname: string;
    deskripsi: string;
  };
  @computed()
  public get links() {
    return {
      user: `https://auth-service.gosports.id/users/${this.userId}`,
    };
  }

  @hasOne(() => DetailPemainFutsal, { localKey: "id", foreignKey: "pemainId" })
  public detailPemainFutsal: HasOne<typeof DetailPemainFutsal>;
}
