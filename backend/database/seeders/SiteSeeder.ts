import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Site from 'App/Models/Public/Site'

export default class extends BaseSeeder {
  public async run () {
    await Site.create({
      subline: 'BATCH 1',
      hero_title: 'Karier Impian di Jepang Menanti!',
      hero_desc: 'Lebih dari sekadar mencari kerja, PIS Japan Career akan membantumu tumbuh! Akses eksklusif ke pelatihan dan pengembangan diri demi mempersiapkanmu menjadi profesional yang siap bersaing di pasar global.',
      footer_desc: 'PIS Japan Career adalah platform yang membantumu meraih peluang karir di Jepang melalui pelatihan intensif bahasa Jepang, pendampingan seleksi pekerjaan, dan koneksi langsung ke banyak perusahaan Jepang berskala global.',
      address: 'Cluster Coding Factory, Kawasan Ekonomi Khusus Singhasari Blok A No. 17-18, Kabupaten Malang, Jawa Timur 65153',
      contact: '+62 813-5747-7083',
      email: 'contact@profileimage.studio',
      url_instagram: 'https://www.instagram.com/profileimagestudio/',
      url_facebook: 'https://www.facebook.com/profileimagestudio/',
      url_linkedin: 'https://id.linkedin.com/company/profileimagestudio',
      url_x: 'https://x.com/profileimagestudio/',
    })
  }
}
