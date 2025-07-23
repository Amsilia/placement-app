import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArticleService from 'App/Services/Public/ArticleService'
import CreateArticleValidator from 'App/Validators/Public/CreateArticleValidator'
import UpdateArticleValidator from 'App/Validators/Public/UpdateArticleValidator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'
import AmazonS3 from 'App/Utils/AmazonS3'
import Redis from '@ioc:Adonis/Addons/Redis'

export default class ArticleController {
  service = new ArticleService()
  FETCHED_ATTRIBUTE = [
    'title',
    'slug',
    'content',
    'user_id',
    'image',
    'is_published'
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

  public async store ({ request, response, auth }: HttpContextContract) {
    try {
      const { image } = await request.validate(CreateArticleValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      data.user_id = auth.use('api').user?.id

      if (image) {
        data.image = await AmazonS3.uploadFile(image, 'articles')
      }

      const result = await this.service.store(data)
      return response.api(result, 'Article created!', 201)
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
      const result = await this.service.show(params.slug, options)
      if (!result) {
        return response.error(null, `Article with slug: ${params.slug} not found`, 404)
      }
      const expire = 60 * 60 * 24
      if (!(await Redis.exists(`${result.id}-ip-${request.ip()}`))) {
        await Redis.setex(`${result.id}-ip-${request.ip()}`, expire  , request.ip())
        await this.service.incrementVisitor(params.slug)
      }
      return response.api(result)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const { image } = await request.validate(UpdateArticleValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      data.slug = data.title.toLowerCase().replace(/ /g, '-')
      const result = await this.service.update(params.id, data, image)
      if (!result) {
        return response.api(null, `Article with id: ${params.id} not found`)
      }
      return response.api(result, 'Article updated!')
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
        return response.api(null, `Article with id: ${params.id} not found`)
      }

      if (result.image) {
        await AmazonS3.deleteFile(`${result.image}`)
      }

      return response.api(null, 'Article deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroyAll ({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll()
      return response.api(null, 'All Article deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }
}
