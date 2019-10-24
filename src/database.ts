import "reflect-metadata"
import { createConnection } from 'typeorm'
import Test from './entity/entity.test'
import User from './entity/entity.user'
import MailVerifyCode from './entity/entity.mailVerifyCode'
import Article from './entity/entity.article'
import ArticleVisit from './entity/entity.articleVisit'
import UserPicture from './entity/entity.userPicture'
import config from './config'

export default async function () {
  try {
    console.log('Connecting to MYSQL...')
    await createConnection({
      type: 'mysql',
      host: config.DATABASE_HOST,
      port: 3306,
      username: config.USER,
      password: config.PASSWORD,
      database: 'zr_dev',
      entities: [Test, MailVerifyCode, User, Article, UserPicture, ArticleVisit],
      synchronize: true
    })
    console.log('MYSQL connected successfully!')
  } catch (error) {
    throw error
  }
}

