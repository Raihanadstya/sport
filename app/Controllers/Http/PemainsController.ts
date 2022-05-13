import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Application from "@ioc:Adonis/Core/Application";
import Pemain from "App/Models/Pemain";

export default class PemainsController {
    public async index({ request, response }: HttpContextContract) {
        try {
            const page = request.input("page", 1);
            return await Pemain.query().paginate(page, 50);
        } catch (error) {
            return response.notFound(error);
        }
    }

    public async store({ request, response, params:{tim_id} }: HttpContextContract) {
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
            } = request.body();

            const foto = request.file('foto',{
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg', 'svg'],
            }); 

            await foto?.move(Application.publicPath('foto/fotoPemain'));

            const fotoPemain = `${foto?.fileName?.toLowerCase()}-${new Date().getTime()+ ""}.${foto?.extname}`;

            return await Pemain.create({
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
        } catch (error) {
            return response.badRequest(error);
        }
    }

    public async show({params:{id} }: HttpContextContract) {
        return await Pemain.query().where({id}).firstOrFail();
    }

    public async update({ request, response, params: {id} }: HttpContextContract) {
        try {
            const {
                posisi, 
                nomor_punggung, 
                facebook,
                twitter,
                instagram,
                youtube,
                tiktok,
            } = request.body();

            const foto = request.file('foto',{
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg', 'svg'],
            }); 

            await foto?.move(Application.publicPath('foto/fotoPemain'));

            const fotoPemain = `${foto?.fileName?.toLowerCase()}-${new Date().getTime()+ ""}.${foto?.extname}`;

            return await Pemain.query().where({id}).update({
                posisi: posisi,
                nomorPunggung: nomor_punggung,
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

    public async destroy({params: {id} }: HttpContextContract) {
        return await Pemain.query().where({ id }).update({
            dihapus: 1,
          });
    }
}
