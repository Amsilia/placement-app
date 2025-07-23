import BaseService from "App/Base/Services/BaseService"
import TestimonialRepository from "App/Repositories/User/TestimonialRepository"
import { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser"
import AmazonS3 from "App/Utils/AmazonS3"
import Testimonial from "App/Models/User/Testimonial"

export default class TestimonialService extends BaseService {
  constructor() {
    super(new TestimonialRepository())
  }

  async store(data: any, image?: MultipartFileContract) {
    try {
      if (image) {
        data.image = await AmazonS3.uploadFile(image, 'testimonials')
      }
      return await this.repository.store(data)
    } catch (error) {
      throw error
    }
  }

  async update(id: string, data: any, image?: MultipartFileContract) {
    try {
      if (image) {
        const testimonial: Testimonial = await this.repository.find(id)
        if (testimonial.image) {
          await AmazonS3.deleteFile(testimonial.image)
        }

        data.image = await AmazonS3.uploadFile(image, 'testimonials')
      }
      return await this.repository.update(id, data)
    } catch (error) {
      throw error
    }
  }
}
