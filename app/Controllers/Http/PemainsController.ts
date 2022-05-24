import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import Pemain from "App/Models/Pemain";
import DetailPemainBasket from "App/Models/DetailPemainBasket";

export default class PemainsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input("page", 1);
      return await Pemain.query().paginate(page, 50);
    } catch (error) {
      return response.notFound(error);
    }
  }

  public async store({
    request,
    response,
    params: { tim_id },
  }: HttpContextContract) {
    try {
      const {
        posisi,
        nomor_punggung,
        nickname,
        deskripsi,
        user_id,
        facebook,
        twitter,
        instagram,
        youtube,
        tiktok,
        cabor,
        tinggiBadan,
        beratBadan,
        tempatLahir,
      } = request.body();

      const foto = request.file("foto", {
        size: "2mb",
        extnames: ["jpg", "png", "jpeg", "svg"],
      });

      await foto?.move(Application.publicPath("foto/fotoPemain"));

      const fotoPemain = `${foto?.fileName?.toLowerCase()}-${
        new Date().getTime() + ""
      }.${foto?.extname}`;

      const pemain = await Pemain.create({
        posisi: posisi,
        nomorPunggung: nomor_punggung,
        nickname: nickname,
        deskripsi: deskripsi,
        userId: user_id,
        timId: tim_id,
        foto: `foto/fotoPemain/${fotoPemain}`,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        youtube: youtube,
        tiktok: tiktok,
      });

      if (cabor == "basket") {
        await DetailPemainBasket.create({
          tinggiBadan,
          beratBadan,
          tempatLahir,
          pemainId: pemain.id,
        });
      }

      return { pemain };
    } catch (error) {
      return response.badRequest(error);
    }
  }

  public async show({ params: { id } }: HttpContextContract) {
    return await Pemain.query()
      .where({ id })
      .preload("detailPemainBasket")
      .firstOrFail();
  }

  public async update({
    request,
    response,
    params: { id },
  }: HttpContextContract) {
    try {
      const {
        posisi,
        nomor_punggung,
        nickname,
        deskripsi,
        facebook,
        twitter,
        instagram,
        youtube,
        tiktok,
        cabor,
        tinggiBadan,
        beratBadan,
        tempatLahir,
      } = request.body();

      const foto = request.file("foto", {
        size: "2mb",
        extnames: ["jpg", "png", "jpeg", "svg"],
      });

      await foto?.move(Application.publicPath("foto/fotoPemain"));

      const fotoPemain = `${foto?.fileName?.toLowerCase()}-${
        new Date().getTime() + ""
      }.${foto?.extname}`;

      if (cabor == "basket") {
        await DetailPemainBasket.query().where({ pemainId: id }).update({
          tinggiBadan,
          beratBadan,
          tempatLahir,
        });
      }

      return await Pemain.query()
        .where({ id })
        .update({
          posisi: posisi,
          nomorPunggung: nomor_punggung,
          nickname: nickname,
          deskripsi: deskripsi,
          foto: `foto/fotoPemain/${fotoPemain}`,
          facebook: facebook,
          twitter: twitter,
          instagram: instagram,
          youtube: youtube,
          tiktok: tiktok,
        });
    } catch (error) {
      return response.notFound(error);
    }
  }

  public async destroy({ params: { id } }: HttpContextContract) {
    return await Pemain.query().where({ id }).update({
      dihapus: 1,
    });
  }
}
