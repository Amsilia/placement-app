import BaseRepository from "App/Base/Repositories/BaseRepository";
import Testimonial from "App/Models/User/Testimonial";

export default class TestimonialRepository extends BaseRepository {
  constructor() {
    super(Testimonial)
  }
}
    