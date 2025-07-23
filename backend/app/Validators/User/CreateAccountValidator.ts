import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/User/Account'

export default class CreateAccountValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    username: schema.string({}, [
      rules.maxLength(100),
      rules.unique({
        table: Account.table,
        column: 'username',
        where: {deleted_at: null}
      })
    ]),
    password: schema.string([
      rules.minLength(8),
    ]),
    email: schema.string({}, [
      rules.maxLength(255),
      rules.email(),
      rules.unique({
        column: 'email',
        table: Account.table,
        where: {deleted_at: null}
      })
    ]),
    google_id: schema.string.optional({}, [
      rules.maxLength(255)
    ]),
    fullname: schema.string({}, [
      rules.maxLength(100)
    ]),
    avatar: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg']
    }),
    is_ban: schema.boolean.optional(),
    no_handphone: schema.string.optional({}, [
      rules.maxLength(20)
    ]),
    gender: schema.enum(['L', 'P']),
  })

  public messages: CustomMessages = {
    'username.required': 'Username is required',
    'username.maxLength': 'Username is too long',
    'username.unique': 'Username is already taken',
    'password.required': 'Password is required',
    'password.minLength': 'Password is too short',
    'email.required': 'Email is required',
    'email.maxLength': 'Email is too long',
    'email.email': 'Email is not valid',
    'email.unique': 'Email is already taken',
    'google_id.maxLength': 'Google ID is too long',
    'fullname.required': 'Fullname is required',
    'fullname.maxLength': 'Fullname is too long',
    'avatar.file.size': 'Avatar size must be less than 2MB',
    'avatar.file.extname': 'Avatar must be an image',
    'is_ban.boolean': 'Ban status must be boolean',
    'no_handphone.maxLength': 'No Handphone is too long',
  }
}
