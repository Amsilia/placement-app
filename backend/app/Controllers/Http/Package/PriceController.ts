import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PriceService from 'App/Services/Package/PriceService'
import CreatePriceValidator from 'App/Validators/Package/CreatePriceValidator'
import UpdatePriceValidator from 'App/Validators/Package/UpdatePriceValidator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'
import AmazonS3 from 'App/Utils/AmazonS3'

export default class PriceController {
  service = new PriceService()
  FETCHED_ATTRIBUTE = [
    'batch_id',
    'icon',
    'name',
    'amount',
    'special_condition'
  ]

  public async index ({ request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all())
      const open = request.qs().open === 'true'
      const result = await this.service.getAll(options, open)
      return response.api(result, 'OK', 200, request)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      const { icon } = await request.validate(CreatePriceValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.store(data, icon)
      return response.api(result, 'Price created!', 201)
    } catch (error) {
      if (error instanceof ValidationException) {
        const errorValidation: any = error
        return response.error(errorValidation.message, errorValidation.messages.errors, 422)
      }
      return response.error(error.message)
    }
  }

  public async show ({ params, request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all())
      const result = await this.service.show(params.id, options)
      if (!result) {
        return response.api(null, `Price with id: ${params.id} not found`)
      }
      return response.api(result)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const { icon } = await request.validate(UpdatePriceValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.update(params.id, data, icon)
      if (!result) {
        return response.api(null, `Price with id: ${params.id} not found`)
      }
      return response.api(result, 'Price updated!')
    } catch (error) {
      if (error instanceof ValidationException) {
        const errorValidation: any = error
        return response.error(errorValidation.message, errorValidation.messages.errors, 422)
      }
      return response.error(error.message)
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    try {
      const result = await this.service.delete(params.id)
      if (!result) {
        return response.api(null, `Price with id: ${params.id} not found`)
      }
      if (result.icon) {
        await AmazonS3.deleteFile(`${result.icon}`)
      }
      return response.api(null, 'Price deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroyAll ({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll()
      return response.api(null, 'All Price deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async indexByBatch({params, request, response}: HttpContextContract) {
    try {
      const options = request.parseParams(request.all());
      const result = await this.service.indexByBatch(params.id, options);
      return response.api(result, 'OK', 200, request)
    } catch (error) {
      return response.error(error.message)
    }
  }
}
