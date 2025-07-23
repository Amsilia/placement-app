import { schema, validator, rules, CustomMessages,  } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBatchValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    batch_number: schema.string(),
    is_active: schema.boolean(),
    start_date: schema.date(),
    end_date: schema.date({}, [
      rules.afterField('start_date')
    ]),
    open_at: schema.date(),
    close_at: schema.date({}, [
      rules.afterField('open_at')
    ]),
  })

 public messages: CustomMessages = {
    'batch_number.required': 'Batch number is required',
    'is_active.required': 'Status is required',
    'start_date.required': 'Start date is required',
    'end_date.required': 'End date is required',
    'end_date.after': 'End date must be after start date',
    'open_at.required': 'Open date is required',
    'close_at.required': 'Close date is required',
    'close_at.after': 'Close date must be after open date',
  }
}
