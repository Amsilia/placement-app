import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTestimonialValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    name: schema.string(),
    image: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    employment: schema.string([
      rules.maxLength(100),
    ]),
    // content: schema.string([
    //   rules.maxLength(500),
    // ]),
    content: schema.string(),
    is_published: schema.boolean()
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required',
    'image.file.size': 'Image must be less than 2mb',
    'image.file.extnames': 'Image must be a valid image format (jpg, jpeg, png)',
    'employment.required': 'Employment is required',
    'employment.maxLength': 'Employment must be less than 100 characters',
    'content.required': 'Content is required',
    'content.maxLength': 'Content must be less than 500 characters',
    'is_published.required': 'Published status is required'
  }
}
