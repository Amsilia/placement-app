import { schema, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePhaseValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    title: schema.string(),
    description: schema.string()
  })

  public messages: CustomMessages = {
    'title.required': 'Title is required',
    'description.required': 'Description is required'
  }
}
