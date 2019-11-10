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
    const connection = await createConnection()
    console.log('MYSQL connected successfully!')
  } catch (error) {
    throw error
  }
}

