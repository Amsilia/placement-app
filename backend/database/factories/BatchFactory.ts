import BatchFactory from 'App/Models/Package/Batch'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PriceFactory from './PriceFactory'

export default Factory.define(BatchFactory, ({ faker }) => {
  return {
    batch_number: faker.helpers.rangeToNumber({ min: 1, max: 5 }).toString(),
    is_active: false,
    start_date: faker.date.recent(),
    end_date: faker.date.future(),
  }
})
.state('active', (batch) => {
  batch.is_active = true
})
.state('1', (batch) => {
  batch.batch_number = '1'
})
.state('2', (batch) => {
  batch.batch_number = '2'
})
.state('3', (batch) => {
  batch.batch_number = '3'
})
.state('4', (batch) => {
  batch.batch_number = '4'
})
.state('5', (batch) => {
  batch.batch_number = '5'
})
.relation('prices', () => PriceFactory)
.build()
