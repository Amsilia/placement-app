import PackageFactory from 'App/Models/Package/Package'
import Factory from '@ioc:Adonis/Lucid/Factory'
import BatchFactory from './BatchFactory'

export default Factory.define(PackageFactory, ({ faker }) => {
  return {
    name: faker.helpers.arrayElement(['Package 1', 'Package 2', 'Package 3']),
    description: faker.lorem.paragraph(3),
  }
})
.relation('batches', () => BatchFactory)
.build()
