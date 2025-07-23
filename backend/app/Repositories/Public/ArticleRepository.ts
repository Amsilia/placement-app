import BaseRepository from "App/Base/Repositories/BaseRepository";
import Article from "App/Models/Public/Article";

export default class ArticleRepository extends BaseRepository {
  constructor() {
    super(Article)
  }

  async show(id: any, fields: any) {
    try {
      this.model = this.mainModel
      this.model = this.model.query().where('slug', id)
      this.model = this.parseSelectedFields(this.model, fields)
      this.model = this.parseRelation(this.model)
      if (this.isSoftDelete) {
        this.model = this.model.whereNull('deleted_at')
      }
      return await this.model.first()
    } catch (error) {
      throw error
    }
  }
}
