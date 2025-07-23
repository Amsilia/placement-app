import ArticleFactory from 'App/Models/Public/Article'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(ArticleFactory, ({ faker }) => {
  return {
    title: faker.lorem.words(5),
    content: faker.lorem.paragraphs(5),
    image: faker.image.url(),
    visitor: faker.helpers.rangeToNumber({ min: 0, max: 1000 }),
    is_published: faker.datatype.boolean()
  }
}).build()
