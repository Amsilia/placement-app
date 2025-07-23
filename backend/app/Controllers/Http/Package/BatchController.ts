import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BatchService from 'App/Services/Package/BatchService'
import CreateBatchValidator from 'App/Validators/Package/CreateBatchValidator'
import UpdateBatchValidator from 'App/Validators/Package/UpdateBatchValidator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'

export default class BatchController {
  service = new BatchService()
  FETCHED_ATTRIBUTE = [
    'package_id',
    'batch_number',
    'is_active',
    'start_date',
    'end_date',
    'open_at',
    'close_at',
  ]

  public async index ({ request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all())
      const open: boolean = request.qs().open === 'true' ? true : false
      const result = await this.service.getBatch(options, open)
      return response.api(result, 'OK', 200, request)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateBatchValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.store(data)
      return response.api(result, 'Batch created!', 201)
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
        return response.api(null, `Batch with id: ${params.id} not found`)
      }
      return response.api(result)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateBatchValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.update(params.id, data)
      if (!result) {
        return response.api(null, `Batch with id: ${params.id} not found`)
      }
      return response.api(result, 'Batch updated!')
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
        return response.api(null, `Batch with id: ${params.id} not found`)
      }
      return response.api(null, 'Batch deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroyAll ({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll()
      return response.api(null, 'All Batch deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async indexByPackage ({ params, request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all())
      const result = await this.service.indexByPackage(params.id, options)
      return response.api(result, 'OK', 200, request)
    } catch (error) {
      return response.error(error.message)
    }
  }
}
