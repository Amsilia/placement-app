import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Price from "App/Models/Package/Price";
import Package from "App/Models/Package/Package";
import { v4 as uuid } from "uuid";
interface PriceData {
  id: string;
  package_id: string;
  name: string;
  description: string;
  amount: number;
  special_condition: string;
}
export default class PriceSeeder extends BaseSeeder {
  public async run() {
    const packages = await Package.all();

    if (packages.length === 0) {
      console.error("PackageSeeder gagal dijalankan!");
      return;
    }

    const pricesData: PriceData[] = [];

    packages.forEach((pkg) => {
      for (let i = 1; i <= 2; i++) {
        // 2 prices per package
        pricesData.push({
          id: uuid(),
          package_id: pkg.id,
          name: `Price ${i} for ${pkg.name}`,
          description: `Description for Price ${i} of ${pkg.name}`,
          amount: 100000 * i,
          special_condition: `Condition for Price ${i} of ${pkg.name}`,
        });
      }
    });

    await Price.createMany(pricesData);
    console.log("Price Seeder Berhasil Dijalankan !")
  }
}
