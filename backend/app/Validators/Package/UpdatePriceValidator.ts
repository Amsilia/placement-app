import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Batch from 'App/Models/Package/Batch'

export default class UpdatePriceValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    batch_id: schema.string([
      rules.exists({ table: Batch.table, column: 'id' })
    ]),
    name: schema.string.optional(),
    icon: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg']
    }),
    amount: schema.number(),
    special_condition: schema.string.optional()
  })

  public messages: CustomMessages = {
    'batch_id.required': 'Batch is required',
    'batch_id.exists': 'Batch not found',
    'icon.file.size': 'Icon size is too large',
    'icon.file.extname': 'Icon must be an image',
    'amount.required': 'Amount is required'
  }
}
