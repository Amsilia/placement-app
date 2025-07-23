import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Batch from "App/Models/Package/Batch";
import Package from "App/Models/Package/Package";

export default class BatchSeeder extends BaseSeeder {
  logger: any;
  public async run() {
    const packageIds = await Package.query().select("id");

    const getRandomUniquePackageIds = (count: number) => {
      const shuffled = packageIds.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count).map(pkg => pkg.id);
    };

    const [packageId1, packageId2, packageId3] = getRandomUniquePackageIds(3);

    await Batch.createMany([
      {
      package_id: packageId1,
      batch_number: "Batch 1",
      is_active: true,
      start_date: new Date("2024-01-01"),
      end_date: new Date("2024-03-31"),
      },
      {
      package_id: packageId2,
      batch_number: "Batch 2",
      is_active: true,
      start_date: new Date("2024-04-01"),
      end_date: new Date("2024-06-30"),
      },
      {
      package_id: packageId3,
      batch_number: "Batch 3",
      is_active: false,
      start_date: new Date("2023-07-01"),
      end_date: new Date("2023-09-30"),
      },
    ]);
    console.log("Batch Seeder Berhasil Dijalankan")
  }
}
