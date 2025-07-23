import RegistrantFactory from 'App/Models/Order/Registrant'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Price from 'App/Models/Package/Price'
import RegistrantStatus from 'App/Models/Order/RegistrantStatus'
import { DateTime } from 'luxon'

export default Factory.define(RegistrantFactory, async ({ faker }) => {
  const price = (await Price.query().select('id').whereHas(
    'batch',
    (builder) => {
      builder.where('is_active', true)
    }
  )).map(price => price.id)
  // const price = (await Price.query().select('id')).map(price => price.id)
  const status = (await RegistrantStatus.query().select('id')).map(status => status.id)

  return {
    price_id: faker.helpers.arrayElement(price),
    status_id: faker.helpers.arrayElement(status),
    price: faker.helpers.rangeToNumber({ min: 100000, max: 1000000 }),
    fullname: faker.person.fullName(),
    no_handphone: faker.phone.number(),
    age: faker.helpers.rangeToNumber({ min: 17, max: 60 }),
    last_education: faker.helpers.arrayElement(['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3']),
    created_at: DateTime.fromJSDate(faker.date.between({ from: '2024-01-01T00:00:00.000+07:00', to: '2024-12-31T23:59:59.999+07:00' })),
  }
}).build()
