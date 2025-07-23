import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Account from 'App/Models/User/Account'
import ArticleFactory from 'Database/factories/ArticleFactory'

export default class extends BaseSeeder {
  public async run () {
    const user = await Account.query().select('id').whereHas('role', (query) => {
      query.where('code', 'ADMIN')
    }).firstOrFail()
    await ArticleFactory.merge({ user_id: user.id }).createMany(100)
  }
}
