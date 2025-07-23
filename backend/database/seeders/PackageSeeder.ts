import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Package from "App/Models/Package/Package";
import { DateTime } from "luxon";

export default class PackageSeeder extends BaseSeeder {
  public async run() {
    try {
      const paket = await Package.create({
        name: "Kursus Bahasa Jepang",
      })

      const batch = await paket.related('batches').createMany([
        {
          batch_number: "1",
          start_date: new Date('2024-11-30'),
          end_date: new Date('2025-01-30'),
          is_active: true,
          open_at: DateTime.fromISO('2024-11-01T00:00:00.000+07:00'),
          close_at: DateTime.fromISO('2024-11-30T23:59:59.999+07:00')
        },
        {
          batch_number: "2",
          start_date: new Date('2025-02-30'),
          end_date: new Date('2025-04-30'),
          is_active: true,
          open_at: DateTime.fromISO('2024-12-01T00:00:00.000+07:00'),
          close_at: DateTime.fromISO('2024-12-10T23:59:59.999+07:00')
        },
      ])

      await batch[0].related('prices').createMany([
        {
          package_id: paket.id,
          name: "Normal Price",
          amount: 30000000
        },
        {
          package_id: paket.id,
          name: "Special Price",
          amount: 24999999,
          special_condition: "Berlaku Untuk Peserta Seminar"
        },
      ])

      await batch[1].related('prices').createMany([
        {
          package_id: paket.id,
          name: "Normal Price",
          amount: 30000000
        },
        {
          package_id: paket.id,
          name: "Special Price",
          amount: 24999999,
          special_condition: "Berlaku Untuk Peserta Seminar"
        },
      ])
    } catch (error) {
      console.log(error)
    }

    console.log("Package Seeder Berhasil Dijalankan")
  }
}
