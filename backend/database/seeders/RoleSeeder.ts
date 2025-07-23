import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/User/Role'
export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        name: 'Administrator',
        code: 'ADMIN'
      },
      {
        name: 'User',
        code: 'USER'
      }
    ])
  }
}
