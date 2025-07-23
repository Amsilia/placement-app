import AccountFactory from 'App/Models/User/Account'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Hash from '@ioc:Adonis/Core/Hash'
import RegistrantFactory from './RegistrantFactory'
import { DateTime } from 'luxon'

export default Factory.define(AccountFactory, async ({ faker }) => {
  return {
    username: faker.internet.userName(),
    password: await Hash.make('password'),
    email: faker.internet.email(),
    fullname: faker.person.fullName(),
    is_verified: true,
    birth_date: DateTime.fromJSDate(faker.date.between({from: '1960-01-01', to: '2003-01-01'})),
    document: faker.internet.url(),
  }
})
.relation('registrants', () => RegistrantFactory)
.build()
