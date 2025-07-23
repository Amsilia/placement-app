import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistrantService from 'App/Services/Order/RegistrantService'
import CreateRegistrantValidator from 'App/Validators/Order/CreateRegistrantValidator'
import UpdateRegistrantValidator from 'App/Validators/Order/UpdateRegistrantValidator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'
import RegistrantStatus from 'App/Models/Order/RegistrantStatus'
import Price from 'App/Models/Package/Price'
import DefaultException from 'App/Exceptions/DefaultException'
import midtransService from 'App/Services/Order/MIdtransService'
import { v4 as uuidv4 } from 'uuid'
import Transaction from 'App/Models/Order/Transaction'



export default class RegistrantController {
  service = new RegistrantService()
  FETCHED_ATTRIBUTE = [
    'price_id',
    'fullname',
    'no_handphone',
    'age',
    'employment_status',
    'institution',
    'last_education',
    'document',
    'status_id'
  ]

  public async index ({ request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all())
      const batch = request.qs().batch
      const packageId = request.qs().package_id
      const status = request.qs().status
      const result = await this.service.getRegistrantBatch(options, batch, packageId, status)
      return response.api(result, 'OK', 200, request)
    } catch (error) {
      return response.error(error.messages)
    }
  }

  public async count({request, response}: HttpContextContract){
    try {
      console.log("===1")
      const batch_id = request.input('batch_id');
      const yearInput = request.input('year');
      const year = yearInput ? Number(yearInput) : undefined;
      const result = await this.service.getCountData({ batch_id, year })
      return response.api(result, 'Count Data Registrant', 200)
    } catch (error) {
      return response.error(error.messages)
    }
  }

public async store ({ request, response, auth }: HttpContextContract) {
  try {
    const { document, price_id } = await request.validate(CreateRegistrantValidator)

    const check = await this.service.checkRegistrantPerBatch(price_id, auth.use('api').user?.id)
    if (check) {
      throw new DefaultException("Can't store registrant more than 1 on single batch", 400)
    }

    const active = await this.service.checkActiveBatch(price_id)
    if (!active) {
      throw new DefaultException('Price not found or batch is not active', 404)
    }

    const open = await this.service.checkOpenBatch(price_id)
    if (!open) {
      throw new DefaultException('Batch is not open', 400)
    }

    const data = request.only(this.FETCHED_ATTRIBUTE)
    const status_id = await RegistrantStatus.findBy("name", "Menunggu")
    if (!status_id) {
      return response.api(null, 'Registrant status not found', 404)
    }

    const price = await Price.findBy("id", data.price_id)
    const user_id = auth.use('api').user?.id
    data.user_id = user_id
    data.status_id = status_id.id
    data.price = price?.amount

    const result = await this.service.store(data, document)

    const orderId = `ORDER-${uuidv4()}`

    const snap = await midtransService.createTransaction(orderId, price!.amount, {
      first_name: result.fullname,
      email: auth.use('api').user?.email || '',  // pastikan string selalu ada
    })



// Simpan transaksi
await Transaction.create({
  registrant_id: result.id,
  order_id: orderId,
  gross_amount: price!.amount,
  payment_type: 'full',
  is_installment: false,
  is_finished: false,
  payment_url: snap.redirect_url,
})

// Kembalikan respons
return response.api({
  registrant: result,
  payment_url: snap.redirect_url
}, 'Registrant created & Midtrans payment URL generated', 201)


    

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
        return response.api(null, `Registrant with id: ${params.id} not found`)
      }
      return response.api(result)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const { transfer_proof } = await request.validate(UpdateRegistrantValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.update(params.id, data, transfer_proof)
      if (!result) {
        return response.api(null, `Registrant with id: ${params.id} not found`)
      }
      return response.api(result, 'Registrant updated!')
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
        return response.api(null, `Registrant with id: ${params.id} not found`)
      }
      return response.api(null, 'Registrant deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroyAll ({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll()
      return response.api(null, 'All Registrant deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async currentRegistrant ({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      const options = request.parseParams(request.all())
      const result = await this.service.showAuthRegistrant(user!.id, options)
      if(!result) {
        return response.api(null, `Registrant data for user with id ${user!.id} not found`, 404)
      }
      return response.api(result, 'OK', 200, request)
  } catch (error) {
      return response.error(error.message)
    }
  }

  public async getRegistrantsByBatch ({ request, response, params }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all())
      const batchId = params.batchId
      const status = request.qs().status
      const result = await this.service.getRegistrantsBatch(batchId, status, options)
      return response.api(result, 'OK', 200, request)
    } catch (error) {
      return response.error(error.message)
    }
  }
}
