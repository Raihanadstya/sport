import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Pemain from 'App/Models/Pemain'

export default class PemainsController {
    public async index({ request, response }: HttpContextContract) {
        try {
            const page = request.input('page', 1)
            const pemains = await Pemain.query().paginate(page, 50)

            return response.status(200).json(pemains)
        } catch (error) {
            return response.status(404).json({
                message: error.message
            })
        }
    }

    public async store({ request, response, params }: HttpContextContract) {
        try {
            const pemain = new Pemain()
            const input = request.only(['posisi', 'nomor_punggung', 'userId'])
            const foto = request.file('foto',{
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg', 'svg'],
            })
            await foto?.move(Application.publicPath('foto/fotoPemain'))

            const fotoPemain = `${foto?.fileName?.toLowerCase()}-${new Date().getTime().toString()}.${foto?.extname}`

            pemain.posisi = input.posisi
            pemain.nomorPunggung = input.nomor_punggung
            pemain.userId = input.userId
            pemain.timId = params.timId
            pemain.foto = `foto/fotoPemain/${fotoPemain}`

            await pemain.save()

            return response.status(200).json({
                success: true,
                data: pemain
            })
        } catch (error) {
            return response.status(404).json({
                message: error.message
            })
        }
    }

    public async show({ response, params }: HttpContextContract) {
        try {
            const pemain = Pemain.findByOrFail('id', params.id)
            
            return response.status(200).json({
                success: true,
                data: pemain
            })
        } catch (error) {
            return response.status(404).json({
                message: error.message
            })
        }
    }

    public async update({ request, response, params }: HttpContextContract) {
        try {
            const pemain = await Pemain.findByOrFail('id', params.id)
            const input = request.only(['posisi', 'nomor_punggung', 'userId'])
            const foto = request.file('foto',{
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg', 'svg'],
            })
            await foto?.move(Application.publicPath('foto/fotoPemain'))

            const fotoPemain = `${foto?.fileName?.toLowerCase()}-${new Date().getTime().toString()}.${foto?.extname}`

            pemain.posisi = input.posisi
            pemain.nomorPunggung = input.nomor_punggung
            pemain.foto = `foto/fotoPemain/${fotoPemain}`

            await pemain.save()

            return response.status(200).json({
                success: true,
                data: pemain
            })
        } catch (error) {
            return response.status(404).json({
                message: error.message
            })
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        try {
            const pemain = await Pemain.findByOrFail('id', params)
            
            await pemain.delete()

            return response.status(200).json({
                success: true,
                data: pemain
            })
        } catch (error) {
            return response.status(404).json({
                message: error.message
            })
        }
    }
}
