import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import Tim from "App/Models/Tim";

export default class TimsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const tims = await Tim.query();

      return response.status(200).json(tims);
    } catch (error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const tim = new Tim();
      const logoTim = request.file("logo", {
        size: "2mb",
        extnames: ["jpg", "png", "jpeg", "svg"],
      });

      await logoTim?.move(Application.publicPath("foto/logoTim"));

      const logo = `${logoTim?.fileName?.toLowerCase()}-${new Date()
        .getTime()
        .toString()}.${logoTim?.extname}`;

      tim.nama = request.input("nama_tim");
      tim.asalInstansi = request.input("asal_instansi");
      tim.deskripsi = request.input("deskripsi");
      tim.userId = request.input("userId");
      tim.logo = `foto/logoTim/${logo}`;

      await tim.save();

      return response.status(201).json({
        message: "berhasil",
        data: tim,
      });
    } catch (error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const tim = await Tim.query().where("id", params.id).preload("pemains");

      return response.status(200).json({
        success: true,
        data: tim,
      });
    } catch (error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const tim = await Tim.findByOrFail("id", params.id);
      const logoTim = request.file("logo", {
        size: "2mb",
        extnames: ["jpg", "gif", "png"],
      });

      await logoTim?.move(Application.publicPath("foto/logoTim"));
      const logo = `${logoTim?.fileName?.toLowerCase()}-${new Date()
        .getTime()
        .toString()}.${logoTim?.extname}`;
      tim.nama = request.input("nama");
      tim.asalInstansi = request.input("asalInstansi");
      tim.deskripsi = request.input("deskripsi");
      tim.logo = `foto/logoTim/${logo}`;

      await tim.save();

      return response.status(200).json({
        success: true,
        data: tim,
      });
    } catch (error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const tim = await Tim.findByOrFail("id", params.id);

      await tim.delete();

      return response.status(200).json({
        success: true,
        data: tim,
      });
    } catch (error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }
}
