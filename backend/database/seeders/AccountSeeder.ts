// database/seeders/AdminSeeder.ts

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Account from 'App/Models/User/Account'
import Hash from '@ioc:Adonis/Core/Hash'
import Role from 'App/Models/User/Role'
import { v4 as uuid } from 'uuid'
import AccountFactory from 'Database/factories/AccountFactory'

export default class AdminSeeder extends BaseSeeder {
  logger: any
  public async run () {
    // Cari role ADMIN
    const adminRole = await Role.findBy('code', 'ADMIN')
    const userRole = await Role.findBy('code', 'USER')

    if (!adminRole) {
      console.log("Error to seeder")
      return
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pisjapancareer.com'

    const existingAdmin = await Account.findBy('email', adminEmail)

    if (!existingAdmin) {
      await Account.create({
        id: uuid(),
        urole_id: adminRole.id,
        username: 'adminPis',
        password: await Hash.make(`${process.env.ADMIN_PASSWORD || 'password'}`), // Ganti dengan password yang aman
        email: adminEmail,
        fullname: 'Administrator',
        avatar: '',
        is_ban: false,
        is_verified: true, // Sudah diverifikasi
        google_id: '',
      })
      console.log("Success to seeder")
    } else {
      console.log("Admin account already exist")
    }
    try {
      await AccountFactory
        .merge({ urole_id: userRole!.id })
        .with('registrants', 1)
        .createMany(300)
    } catch (error) {
      console.log(error)
    }
  }
}
