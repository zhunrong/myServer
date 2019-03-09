import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import config from './config'
import router from './routes'

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
