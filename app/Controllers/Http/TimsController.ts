import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import Tim from "App/Models/Tim";

export default class TimsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const page = request.input("page", 1);
      return await Tim.query().where("dihapus", 0).paginate(page, 50);
    } catch (error) {
      return response.notFound(error);
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const logoTim = request.file("logo", {
        size: "2mb",
        extnames: ["jpg", "png", "jpeg", "svg"],
      });

      await logoTim?.move(Application.publicPath("foto/logoTim"));

      const logo = `${logoTim?.fileName?.toLowerCase()}-${
        new Date().getTime() + ""
      }.${logoTim?.extname}`;

      const {
        nama_tim,
        asal_instansi,
        deskripsi,
        user_id,
        provinsi,
        wilayah,
        website,
        facebook,
        twitter,
        instagram,
        youtube,
        tiktok,
      } = request.body();
      return await Tim.create({
        nama: nama_tim,
        asalInstansi: asal_instansi,
        deskripsi: deskripsi,
        userId: user_id,
        logo: `foto/logoTim/${logo}`,
        provinsi: provinsi,
        wilayah: wilayah,
        website: website,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        youtube: youtube,
        tiktok: tiktok,
      });
    } catch (error) {
      return response.badRequest(error);
    }
  }

  public async show({ params: { id } }: HttpContextContract) {
    return await Tim.query().where({ id }).firstOrFail();
  }

  public async update({
    request,
    response,
    params: { id },
  }: HttpContextContract) {
    try {
      const logoTim = request.file("logo", {
        size: "2mb",
        extnames: ["jpg", "gif", "png"],
      });
      await logoTim?.move(Application.publicPath("foto/logoTim"));
      const logo = `${logoTim?.fileName?.toLowerCase()}-${
        new Date().getTime() + ""
      }.${logoTim?.extname}`;

      const {
        nama_tim,
        asal_instansi,
        deskripsi,
        user_id,
        provinsi,
        wilayah,
        website,
        facebook,
        twitter,
        instagram,
        youtube,
        tiktok,
      } = request.body();
      return await Tim.query()
        .where({ id })
        .update({
          nama: nama_tim,
          asalInstansi: asal_instansi,
          deskripsi: deskripsi,
          userId: user_id,
          logo: `foto/logoTim/${logo}`,
          provinsi: provinsi,
          wilayah: wilayah,
          website: website,
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
    return await Tim.query().where({ id }).update({
      dihapus: 1,
    });
  }
}
