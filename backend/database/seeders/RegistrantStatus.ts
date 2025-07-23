import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RegistrantStatus from 'App/Models/Order/RegistrantStatus'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await RegistrantStatus.createMany([
      {
        name: 'Menunggu'
      },
      {
        name: 'Diterima'
      },
      {
        name: 'Ditolak'
      },
      {
        name: 'Berlangsung'
      },
      {
        name: 'Selesai'
      }
    ])
  }
}
