import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TestimonialService from 'App/Services/User/TestimonialService'
import CreateTestimonialValidator from 'App/Validators/User/CreateTestimonialValidator'
import UpdateTestimonialValidator from 'App/Validators/User/UpdateTestimonialValidator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'
import AmazonS3 from 'App/Utils/AmazonS3'

export default class TestimonialController {
  service = new TestimonialService()
  FETCHED_ATTRIBUTE = [
    // attribute
    'name',
    'image',
    'employment',
    'content',
    'is_published',
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
      const { image } = await request.validate(CreateTestimonialValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      // return { data, image }
      const result = await this.service.store(data, image)
      return response.api(result, 'Testimonial created!', 201)
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
        return response.api(null, `Testimonial with id: ${params.id} not found`)
      }
      return response.api(result)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const { image } = await request.validate(UpdateTestimonialValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.update(params.id, data, image)
      if (!result) {
        return response.api(null, `Testimonial with id: ${params.id} not found`)
      }
      return response.api(result, 'Testimonial updated!')
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
        return response.api(null, `Testimonial with id: ${params.id} not found`)
      }

      if (result.image) {
        await AmazonS3.deleteFile(`${result.image}`)
      }

      return response.api(null, 'Testimonial deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroyAll ({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll()
      return response.api(null, 'All Testimonial deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }
}
