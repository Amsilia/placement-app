import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateSiteValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    logo1: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    logo2: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    subline: schema.string.optional(),
    hero_title: schema.string.optional(),
    hero_desc: schema.string.optional(),
    footer_desc: schema.string.optional(),
    address: schema.string.optional(),
    contact: schema.string.optional(),
    email: schema.string.optional({}, [
      rules.email()
    ]),
    url_instagram: schema.string.optional({}, [
      rules.url()
    ]),
    url_facebook: schema.string.optional({}, [
      rules.url()
    ]),
    url_linkedin: schema.string.optional({}, [
      rules.url()
    ]),
    url_x: schema.string.optional({}, [
      rules.url()
    ]),
  })

  public messages: CustomMessages = {
    'logo1.file.size': 'Logo 1 must be less than 2mb',
    'logo1.file.extnames': 'Logo 1 must be a valid image format (jpg, jpeg, png)',
    'logo2.file.size': 'Logo 2 must be less than 2mb',
    'logo2.file.extnames': 'Logo 2 must be a valid image format (jpg, jpeg, png)',
    'subline.required': 'Subline is required',
    'hero_title.required': 'Hero title is required',
    'hero_desc.required': 'Hero description is required',
    'footer_desc.required': 'Footer description is required',
    'address.required': 'Address is required',
    'contact.required': 'Contact is required',
    'email.required': 'Email is required',
    'email.email': 'Email must be a valid email',
    'url_instagram.required': 'Instagram URL is required',
    'url_instagram.url': 'Instagram URL must be a valid URL',
    'url_facebook.required': 'Facebook URL is required',
    'url_facebook.url': 'Facebook URL must be a valid URL',
    'url_linkedin.required': 'LinkedIn URL is required',
    'url_linkedin.url': 'LinkedIn URL must be a valid URL',
  }
}
