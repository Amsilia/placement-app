import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTestimonialValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    name: schema.string(),
    image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    employment: schema.string([
      rules.maxLength(100),
    ]),
    content: schema.string([
      rules.maxLength(500),
    ]),
    is_published: schema.boolean()
  })

  public messages: CustomMessages = {
    'name.required': 'Name required',
    'name.maxLength': 'Name too long',
    'employment.maxLength': 'Employment too long',
    'content.maxLength': 'Content too long',
    'image.file.extname': 'Image must be an image',
    'image.file.size': 'Image too large',
  }
}
