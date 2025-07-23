import { rules, schema, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Price from 'App/Models/Package/Price'

export default class CreateRegistrantValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    price_id: schema.string([
      rules.exists({ table: Price.table, column: 'id' }),
    ]),
    fullname:schema.string(),
    no_handphone: schema.string(),
    age: schema.number(),
    employment_status: schema.string(),
    institution: schema.string(),
    document: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'pdf']
    })
  })

  public messages: CustomMessages = {
    'price_id.exists': 'Price not found',
    'document.size': 'Document size must be less than 2mb',
    'age.required': 'Age is required',
    'employment_status.required': 'Employment status is required',
    'institution.required': 'Institution is required',
    'document.extnames': 'Document must be an image or pdf'
  }
}
