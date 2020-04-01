import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import router from './routes'
import initMysql from './database'

(async () => {

  try {
    await initMysql()

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

    app.listen(process.env.PORT || 80, () => {
      console.log('server is running')
    })
  } catch (error) {
    throw error
  }

})()

