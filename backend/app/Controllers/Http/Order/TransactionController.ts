import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionService from 'App/Services/Order/TransactionService'
import CreateTransactionValidator from 'App/Validators/Order/CreateTransactionValidator'
import UpdateTransactionValidator from 'App/Validators/Order/UpdateTransactionValidator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'

export default class TransactionController {
  service = new TransactionService()
  FETCHED_ATTRIBUTE = [
    // attribute
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
  
public async byRegistrant({ params, response }: HttpContextContract) {
  try {
    const registrantId = params.registrantId

    if (!registrantId) {
      return response.badRequest({ error: 'registrantId is required' })
    }

    const result = await this.service.getByRegistrantId(registrantId)
    return response.api(result, 'Transactions fetched!')
  } catch (error) {
    return response.error(error.message)
  }
}

  public async store ({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateTransactionValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.store(data)
      return response.api(result, 'Transaction created!', 201)
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
        return response.api(null, `Transaction with id: ${params.id} not found`)
      }
      return response.api(result)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateTransactionValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.update(params.id, data)
      if (!result) {
        return response.api(null, `Transaction with id: ${params.id} not found`)
      }
      return response.api(result, 'Transaction updated!')
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
        return response.api(null, `Transaction with id: ${params.id} not found`)
      }
      return response.api(null, 'Transaction deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroyAll ({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll()
      return response.api(null, 'All Transaction deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }
}
