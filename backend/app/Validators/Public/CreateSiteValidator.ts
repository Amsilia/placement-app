import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSiteValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public reporter = validator.reporters.api

  public schema = schema.create({
    logo1: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    logo2: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }),
    subline: schema.string(),
    hero_title: schema.string(),
    hero_desc: schema.string(),
    footer_desc: schema.string(),
    address: schema.string(),
    contact: schema.string(),
    email: schema.string({}, [
      rules.email()
    ]),
    url_instagram: schema.string({}, [
      rules.url()
    ]),
    url_facebook: schema.string({}, [
      rules.url()
    ]),
    url_linkedin: schema.string({}, [
      rules.url()
    ]),
    url_x: schema.string({}, [
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
    'url_x.required': 'X URL is required',
    'url_x.url': 'X URL must be a valid URL',
  }
}
