import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import validator from 'validator'

export default class ResendVerifyEmailValidator {
    constructor (protected ctx: HttpContextContract) {}

    public reporter = validator.reporters.api

    public schema = schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.exists({ table: 'user.account', column: 'email', where: { is_verified: false, deleted_at: null } })
      ]),
    })

    public messages: CustomMessages = {
      'email.required': 'Email diperlukan',
      'email.email': 'Format email tidak valid',
      'email.exists': 'Email tidak terdaftar atau sudah diverifikasi',
    }
  }
