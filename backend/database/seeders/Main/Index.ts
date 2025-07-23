import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }

  public async run () {
    await this.runSeeder(await import('../SiteSeeder'))
    await this.runSeeder(await import('../RoleSeeder'))
    await this.runSeeder(await import('../RegistrantStatus'))
    await this.runSeeder(await import('../PackageSeeder'))
    await this.runSeeder(await import('../AccountSeeder'))
    await this.runSeeder(await import('../ArticleSeeder'))
  }
}
