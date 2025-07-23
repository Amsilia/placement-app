import BaseRepository from "App/Base/Repositories/BaseRepository";
import Price from "App/Models/Package/Price";
import { DateTime } from "luxon";

export default class PriceRepository extends BaseRepository {
  constructor() {
    super(Price)
  }

  async getAll(pagination: any, sort: any, whereClauses: any, fields: any, search: any, open: boolean = true) {
    try {
      this.model = this.mainModel
      this.model = this.model.query()
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseWhere(this.model, whereClauses)
      this.model = this.parseSearch(this.model, whereClauses, search)
      this.model = this.parseRelation(this.model)
      this.model = this.parseSort(this.model, sort)
      if(open) {
        const now = DateTime.now().toISO()
        this.model = this.model.whereHas('batch', (query) => {
          query.where('open_at', '<=', now).andWhere('close_at', '>=', now)
        })
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

  async indexByBatchId(batchId: any, pagination: any, sort: any, whereClauses : any, fields : any, search :any){
    try {
      this.model = this.mainModel
      this.model = this.model.query().where('batch_id', batchId);
      this.model = this.parseSelectedFields(this.model, fields);
      this.model = this.parseWhere(this.model, whereClauses);
      this.model = this.parseSearch(this.model, whereClauses, search);
      this.model = this.parseRelation(this.model);
      this.model = this.parseSort(this.model, sort);
      if (pagination.page && pagination.limit){
        if (this.isSoftDelete){
          return await this.model.whereNull('deleted_at').paginate(pagination.page, pagination.limit);
    
        }
        return await this.model.paginate(pagination.page, pagination.limit)
      }else {
        if( this.isSoftDelete){
          return await this.model.whereNull('deleted_at');
        }
        return await this.model
      }
    } catch (error) {
      throw error
    }
  }
}
