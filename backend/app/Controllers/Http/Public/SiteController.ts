import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SiteService from 'App/Services/Public/SiteService'
import CreateSiteValidator from 'App/Validators/Public/CreateSiteValidator'
import UpdateSiteValidator from 'App/Validators/Public/UpdateSiteValidator'
import { ValidationException } from '@ioc:Adonis/Core/Validator'
import AmazonS3 from 'App/Utils/AmazonS3'

export default class SiteController {
  service = new SiteService()
  FETCHED_ATTRIBUTE = [
    'logo1',
    'logo2',
    'subline',
    'hero_title',
    'hero_desc',
    'footer_desc',
    'address',
    'contact',
    'email',
    'url_instagram',
    'url_facebook',
    'url_linkedin',
    'url_x'
  ]

  public async index ({ request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all())
      const result = await this.service.getSite(options)
      return response.api(result, 'OK', 200, request)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      const site = await this.service.first()
      const { logo1, logo2 } = site ? await request.validate(UpdateSiteValidator) : await request.validate(CreateSiteValidator)
      const data = request.only(this.FETCHED_ATTRIBUTE)
      const result = await this.service.store(data, logo1, logo2)
      if (site) {
        return response.api(result, 'Site updated!', 200)
      }
      return response.api(result, 'Site created!', 201)
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
        return response.api(null, `Site with id: ${params.id} not found`)
      }
      return response.api(result)
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    try {
      const result = await this.service.delete(params.id)

      if (!result) {
        return response.api(null, `Site with id: ${params.id} not found`)
      }

      if (result.logo1) {
        await AmazonS3.deleteFile(`${result.logo1}`)
      }

      if (result.logo2) {
        await AmazonS3.deleteFile(`${result.logo2}`)
      }

      return response.api(null, 'Site deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async destroyAll ({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll()
      return response.api(null, 'All Site deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async deleteLogo1 ({ response }: HttpContextContract) {
    try {
      const result = await this.service.deleteLogo1()
      if (!result) {
        return response.api(null, `Site not found`)
      }
      return response.api(null, 'Logo 1 deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }

  public async deleteLogo2 ({ response }: HttpContextContract) {
    try {
      const result = await this.service.deleteLogo2()
      if (!result) {
        return response.api(null, `Site not found`)
      }
      return response.api(null, 'Logo 2 deleted!')
    } catch (error) {
      return response.error(error.message)
    }
  }
}
