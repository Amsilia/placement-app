import BaseRepository from "App/Base/Repositories/BaseRepository";
import Site from "App/Models/Public/Site";

export default class SiteRepository extends BaseRepository {
  constructor() {
    super(Site)
  }

  async getSite(fields: any) {
    try {
      this.model = this.mainModel
      this.model = this.model.query()
      this.model = this.parseSelectedFields(this.model, fields)
      if (this.isSoftDelete) {
        this.model = this.model.whereNull('deleted_at')
      }
      return await this.model.first()
    } catch (error) {
      throw error
    }
  }
}
