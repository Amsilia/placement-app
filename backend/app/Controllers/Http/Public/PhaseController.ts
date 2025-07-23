import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PhaseService from 'App/Services/Public/PhaseService'
import CreatePhaseValidator from 'App/Validators/Public/CreatePhaseValidator'
import UpdatePhaseValidator from 'App/Validators/Public/UpdatePhaseValidator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'

export default class PhaseController {
  service = new PhaseService()
  FETCHED_ATTRIBUTE = [
    'title',
    'description'
  ]

  public async index ({ request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all())
      const result = await this.service.getAll(options)
      return response.api(result, 'OK', 200, request)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreatePhaseValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.store(data)
      return response.api(result, 'Phase created!', 201)
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
        return response.api(null, `Phase with id: ${params.id} not found`)
      }
      return response.api(result)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdatePhaseValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.update(params.id, data)
      if (!result) {
        return response.api(null, `Phase with id: ${params.id} not found`)
      }
      return response.api(result, 'Phase updated!')
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
        return response.api(null, `Phase with id: ${params.id} not found`)
      }
      return response.api(null, 'Phase deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroyAll ({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll()
      return response.api(null, 'All Phase deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }
}
