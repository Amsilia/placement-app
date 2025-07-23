import BaseRepository from "App/Base/Repositories/BaseRepository";
import Batch from "App/Models/Package/Batch";
import { DateTime } from "luxon";

export default class BatchRepository extends BaseRepository {
  constructor() {
    super(Batch)
  }

  async getBatch(open: boolean, pagination: any, sort: any, whereClauses: any, fields: any, search: any) {
    try {
      this.model = this.mainModel
      this.model = this.model.query()
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseWhere(this.model, whereClauses)
      this.model = this.parseSearch(this.model, whereClauses, search)
      this.model = this.parseRelation(this.model)
      this.model = this.parseSort(this.model, sort)
      if (open) {
        const now = DateTime.now().toISO()
        this.model = this.model.where('open_at', '<=', now).andWhere('close_at', '>=', now)
      }
      if (pagination.page && pagination.limit) {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at').paginate(pagination.page, pagination.limit)
        }
        return await this.model.paginate(pagination.page, pagination.limit)
      } else {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at')
        }
        return await this.model
      }
    } catch (error) {
      throw error
    }
  }

  async indexByPackageId(packageId: any, pagination: any, sort: any, whereClauses: any, fields: any, search: any) {
    try {
      this.model = this.mainModel
      this.model = this.model.query().where('package_id', packageId)
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseWhere(this.model, whereClauses)
      this.model = this.parseSearch(this.model, whereClauses, search)
      this.model = this.parseRelation(this.model)
      this.model = this.parseSort(this.model, sort)
      if (pagination.page && pagination.limit) {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at').paginate(pagination.page, pagination.limit)
        }
        return await this.model.paginate(pagination.page, pagination.limit)
      } else {
        if (this.isSoftDelete) {
          return await this.model.whereNull('deleted_at')
        }
        return await this.model
      }
    } catch (error) {
      throw error
    }
  }
}
