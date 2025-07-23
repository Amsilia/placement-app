import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateArticleValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    title: schema.string([
      rules.unique({ table: 'articles', column: 'title' })
    ]),
    slug: schema.string.optional({}, [
      rules.unique({ table: 'articles', column: 'slug' })
    ]),
    content: schema.string.optional(),
    image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg']
    }),
    is_published: schema.boolean.optional()
  })

  public messages: CustomMessages = {
    'title.required': 'Title is required',
    'title.unique': 'Title must be unique',
    'content.required': 'Content is required',
    'image.file.size': 'Image must be less than 2mb',
    'image.file.extnames': 'Image must be a valid image format (jpg, jpeg, png)'
  }
}
