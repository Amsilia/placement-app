import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRoleValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    code: schema.string({}, [
			rules.maxLength(4)
		]),
    name: schema.string({}, [
			rules.maxLength(50)
		]),
  })

  public messages: CustomMessages = {
    'code.required': 'Code is required',
    'code.maxLength': 'Code is too long',
    'name.required': 'Name is required',
    'name.maxLength': 'Name is too long',
  }
}
