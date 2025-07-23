import BaseService from "App/Base/Services/BaseService"
import SiteRepository from "App/Repositories/Public/SiteRepository"
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import AmazonS3 from "App/Utils/AmazonS3"
import Site from "App/Models/Public/Site"

export default class SiteService extends BaseService {
  constructor() {
    super(new SiteRepository())
  }

  async getSite(options: any) {
    try {
      return await this.repository.getSite(options.fields)
    } catch (error) {
      throw error
    }
  }

  async store(data: any, logo1?: MultipartFileContract, logo2?: MultipartFileContract) {
    try {
      const site: Site = await this.repository.first()

      if (logo1) {
        data.logo1 = await AmazonS3.uploadFile(logo1, 'sites')
        if (site?.logo1) {
          await AmazonS3.deleteFile(site.logo1)
        }
      }

      if (logo2) {
        data.logo2 = await AmazonS3.uploadFile(logo2, 'sites')
        if (site?.logo2) {
          await AmazonS3.deleteFile(site.logo2)
        }
      }

      if (site) {
        return await site.merge(data).save()
      }
      return await this.repository.store(data)
    } catch (error) {
      throw error
    }
  }

  async deleteLogo1() {
    try {
      const site: Site = await this.repository.first()

      if (!site) {
        return
      }

      if (!site?.logo1) {
        throw new Error('Logo1 not found')
      }

      await AmazonS3.deleteFile(site.logo1)
      site.logo1 = ''
      return await site.save()
    } catch (error) {
      throw error
    }
  }

  async deleteLogo2() {
    try {
      const site: Site = await this.repository.first()

      if (!site) {
        return
      }

      if (!site?.logo2) {
        throw new Error('Logo1 not found')
      }

      await AmazonS3.deleteFile(site.logo2)
      site.logo2 = ''
      return await site.save()
    } catch (error) {
      throw error
    }
  }
}
