import { schema, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePackageValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    name: schema.string(),
    description: schema.string()
  })

  public messages: CustomMessages = {
    'name.required': 'Package name is required',
    'description.required': 'Description is required'
  }
}
