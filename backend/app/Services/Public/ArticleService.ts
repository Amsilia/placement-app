import BaseService from "App/Base/Services/BaseService"
import ArticleRepository from "App/Repositories/Public/ArticleRepository"
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import AmazonS3 from "App/Utils/AmazonS3"
import Article from "App/Models/Public/Article"

export default class ArticleService extends BaseService {
  constructor() {
    super(new ArticleRepository())
  }
  async store(data: any, image?: MultipartFileContract) {
    try {
      if (image) {
        data.image = await AmazonS3.uploadFile(image, 'articles')
      }
      return await this.repository.store(data)
    } catch (error) {
      throw error
    }
  }

  async update(id: any, data: any, image?: MultipartFileContract) {
    try {
      if (image) {
        const article = await this.repository.find(id)
        if (article.image) {
          await AmazonS3.deleteFile(article.image)
        }

        data.image = await AmazonS3.uploadFile(image, 'articles')
      }
      return await this.repository.update(id, data)
    } catch (error) {
      throw error
    }
  }

  async incrementVisitor(id: any) {
    try {
      return await Article.query().where('slug', id).increment('visitor', 1)
    } catch (error) {
      throw error
    }
  }
}
