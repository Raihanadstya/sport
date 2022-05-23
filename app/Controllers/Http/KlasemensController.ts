import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Klasemen from 'App/Models/Klasemens'


export default class KlasemensController {

public async index({ request, response }: HttpContextContract) {
    try {
            const page = request.input('page', 1)
            return await Klasemen.query().paginate(page, 50)
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
            bermain,
            menang,
            kalah,
            seri,
            poin,
          } = request.body();

          return await Klasemen.create({
            bermain: bermain,
            menang: menang,
            kalah: kalah,
            seri:seri,
            poin: poin,
            timId:tim_id,
          });
        } catch (error) {
          return response.badRequest(error);
        }
      }

public async show({ params: { id } }: HttpContextContract) {
    return await Klasemen.query().preload("tims").where({ id }).firstOrFail();
      }

public async update({
        request,
        response,
        params: { tim_id },
      }: HttpContextContract) {
        try {
          const {
            bermain,
            menang,
            kalah,
            seri,
            poin,
          } = request.body();

          return await Klasemen.create({
            bermain: bermain,
            menang: menang,
            kalah: kalah,
            seri:seri,
            poin: poin,
            timId:tim_id,
          });
        } catch (error) {
          return response.badRequest(error);
        }
      }

public async destroy({ params: { id } }: HttpContextContract) {
        return await Klasemen.query().where({ id }).update({
          dihapus: 1,
        });
      }
    }
    