import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateArticleValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    title: schema.string(),
    slug: schema.string.optional({}, [
      rules.unique({ table: 'articles', column: 'slug' })
    ]),
    content: schema.string(),
    image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg']
    }),
    is_published: schema.boolean()
  })

  public messages: CustomMessages = {
    'title.required': 'Title is required',
    'content.required': 'Content is required',
    'image.file.size': 'Image size must be less than 2MB',
    'image.file.extname': 'Image must be an image',
    'is_published.required': 'Published status is required'
  }
}
