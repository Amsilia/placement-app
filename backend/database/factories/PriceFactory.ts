import PriceFactory from 'App/Models/Package/Price'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(PriceFactory, async ({ faker }) => {
  return {
    amount: faker.helpers.rangeToNumber({ min: 100000, max: 1000000 }),
    special_condition: faker.lorem.sentence(),
  }
})
.build()
