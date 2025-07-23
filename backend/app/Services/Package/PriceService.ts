import BaseService from "App/Base/Services/BaseService"
import PriceRepository from "App/Repositories/Package/PriceRepository"
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import AmazonS3 from "App/Utils/AmazonS3"
import Batch from "App/Models/Package/Batch"

export default class PriceService extends BaseService {
  constructor() {
    super(new PriceRepository())
  }

  async getAll(options: any, open?: boolean) {
    try {
      this.repository.setRelation(options.relation)
      this.repository.setRelationOptions(options.relationOptions)
      const results = await this.repository.getAll(options.pagination, options.sort, options.filter, options.fields, options.search, open)
      return results
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async indexByBatch(batch_id: any, options: any){
    try {
      this.repository.setRelation(options.relation);
      this.repository.setRelation(options.relationOptions);
      const results = await this.repository.indexByBatchId(batch_id, options.pagination, options.sort, options.filter, options.fields, options.search)
      return results
    } catch (error) {
      throw error
    }
  }

  async store(data: any, icon?: MultipartFileContract) {
    try {
      if (icon) {
        data.icon = await AmazonS3.uploadFile(icon, 'prices')
      }
      const batch = await Batch.findOrFail(data.batch_id)
      await batch.load('package')
      return await this.repository.store({
        package_id: batch.package.id,
        batch_id: data.batch_id,
        name: data.name,
        amount: data.amount,
        special_condition: data.special_condition || null,
        icon: data.icon || null
      })
    } catch (error) {
      throw error
    }
  }

  async update(id: any, data: any, icon?: MultipartFileContract) {
    try {
      if (icon) {
        const site = await this.repository.find(id)
        if (site.icon) {
          await AmazonS3.deleteFile(site.icon)
        }

        data.icon = await AmazonS3.uploadFile(icon, 'prices')
      }
      return await this.repository.update(id, data)
    } catch (error) {
      throw error
    }
  }
}
