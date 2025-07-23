import BaseService from "App/Base/Services/BaseService"
import BatchRepository from "App/Repositories/Package/BatchRepository"

export default class BatchService extends BaseService {
  constructor() {
    super(new BatchRepository())
  }

  async getBatch(options: any, open: boolean) {
    try {
      this.repository.setRelation(options.relation)
      this.repository.setRelationOptions(options.relationOptions)
      const results =  await this.repository.getBatch(open, options.pagination, options.sort, options.filter, options.fields, options.search)
      return results
    } catch (error) {
      throw error
    }
  }

  async indexByPackage(packageId: any, options: any) {
    try {
      this.repository.setRelation(options.relation)
      this.repository.setRelationOptions(options.relationOptions)
      const results = await this.repository.indexByPackageId(packageId, options.pagination, options.sort, options.filter, options.fields, options.search)
      return results
    } catch (error) {
      throw error
    }
  }
}
