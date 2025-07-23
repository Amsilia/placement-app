import { schema, rules, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/User/Account'

export default class UpdateProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api

  public schema = schema.create({
    fullname: schema.string.optional({}, [
      rules.maxLength(255),
    ]),
    avatar: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    email: schema.string.optional({}, [
      rules.maxLength(255),
      rules.email(),
      rules.unique({
        column: 'email',
        table: Account.table,
      }),
    ]),
    no_handphone: schema.string.optional({}, [
      rules.maxLength(20)
    ]),
    birth_date: schema.date.optional(),
    gender: schema.enum.optional(['L', 'P']),
  })

  public messages: CustomMessages = {
    'email.email': 'Email not valid',
    'email.unique': 'Email already exists',
    'email.maxLength': 'Email too long',
    'fullname.maxLength': 'Fullname too long',
    'avatar.file.extname': 'Avatar must be an image',
    'avatar.file.size': 'Avatar too large',
    'no_handphone.maxLength': 'No Handphone too long',
  }
}
