import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateBatchValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    name: schema.string(),
    is_active: schema.boolean(),
    start_date: schema.date(),
    end_date: schema.date({}, [
      rules.afterField('start_date')
    ])
  })

  public messages: CustomMessages = {
      'name.required': 'Batch number is required',
      'is_active.required': 'Status is required',
      'start_date.required': 'Start date is required',
      'end_date.required': 'End date is required',
      'end_date.after': 'End date must be after start date'
    }
}
