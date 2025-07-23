import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Registrant from "App/Models/Order/Registrant";
import RegistrantStatus from "App/Models/Order/RegistrantStatus";
import Price from "App/Models/Package/Price";
import Batch from "App/Models/Package/Batch";
import Package from "App/Models/Package/Package";
import { v4 as uuid } from "uuid";

interface RegistrantData{
  id: string;
  user_id : string;
  price_id: string;
  status_id: string;
  price : number;
  fullname : string;
  no_handphone: string;
  age: number;
  employment_status: string;
  institution: string;
}
export default class RegistrantSeeder extends BaseSeeder {
  public async run() {
    // Pastikan ada beberapa price dan batch
    const batches = await Batch.all();
    const prices = await Price.all();

    if (batches.length === 0 || prices.length === 0) {
      console.error("Beberapa Batch dan Price tidak ditemukan!");
      return;
    }

    // Mendapatkan status registrant
    const statusMenunggu = await RegistrantStatus.findBy("name", "Menunggu");
    const statusDiterima = await RegistrantStatus.findBy("name", "Diterima");
    const statusDitolak = await RegistrantStatus.findBy("name", "Ditolak");
    const statusBerlangsung = await RegistrantStatus.findBy(
      "name",
      "Berlangsung"
    );
    const statusSelesai = await RegistrantStatus.findBy("name", "Selesai");

    // Pastikan semua status ada
    if (
      !statusMenunggu ||
      !statusDiterima ||
      !statusDitolak ||
      !statusBerlangsung ||
      !statusSelesai
    ) {
     console.error("Beberapa RegistrantStatus tidak ditemukan!");
      return;
    }

    const registrantsData : RegistrantData[] = [];

    for (let i = 1; i <= 100; i++) {
      const batch = batches[Math.floor(Math.random() * batches.length)];
      const packageOfBatch = await Package.query()
        .where("batch_id", batch.id)
        .first();
      if (!packageOfBatch) continue;
      const price = prices.filter((p) => p.package_id === packageOfBatch.id)[
        Math.floor(Math.random() * 2)
      ];

      const statuses = [
        statusMenunggu,
        statusDiterima,
        statusDitolak,
        statusBerlangsung,
        statusSelesai,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      registrantsData.push({
        id: uuid(),
        user_id: `26ce567b-4ab4-4c7d-a467-81a4be0ce95d`, // Ganti dengan user_id yang valid atau biarkan null jika tidak ada
        price_id: price.id,
        status_id: status.id,
        price: price.amount,
        fullname: `Registrant ${i}`,
        no_handphone: '081234567890',
        age: Math.floor(Math.random() * 50) + 18, // Umur antara 18-67
        employment_status: ['belum bekerja', 'pelajar/mahasiswa', 'bekerja'][
          Math.floor(Math.random() * 3)
        ],
        institution: ["Company A", "University B", "Institute C"][
          Math.floor(Math.random() * 3)
        ],

      });
    }

    await Registrant.createMany(registrantsData);
    console.log("RegistrantSeeder berhasil dijalankan!")
  }
}

