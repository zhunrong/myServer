import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config'
import router from './routes'
import initMysql from './database'
import { getArticleById } from './service/service.article'

(async () => {

  try {
    await initMysql()

    // const article = await getArticleById('7075e57e-cb0f-4578-94c7-1eed675ee032')
    // console.log(article.stop())
    // console.log('123')

    const app = express()
    // 静态资源托管
    app.use('/', express.static(path.resolve(__dirname, '../static/public')))
    // 解析json请求数据
    app.use(bodyParser.json())
    // 解析urlencoded请求数据
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    )

    router(app)

    app.listen(config.PORT, () => {
      console.log('server is running')
    })
  } catch (error) {
    throw error
  }

})()

