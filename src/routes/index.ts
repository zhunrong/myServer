import express from 'express'
import expressJwt from 'express-jwt'
import config from '../config'
import { get, post, put, del } from '../controller/test'
import yebaRouter from './router.yeba'
import authorize from './router.authorize'
import explorer from './router.explorer'
import article from './router.article'
import user from './router.user'
// CORS
const corsHandler = (req: any, res: any, next: any) => {
  const origin = req.headers.origin
  if (origin) {
    //如果是同源的，则没有origin字段
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Max-Age', 604800)
    res.setHeader('Access-Control-Allow-Credentials', 'true') //允许跨域名设置cookie
  }
  next()
}

const tokenChecker = expressJwt({
  secret: config.TOKEN_SECRET,
  requestProperty: 'auth'
}).unless({
  path: config.DO_NOT_CHECK_REQUEST_PATH
})

const router = express.Router()
router.get('/express', get)
router.post('/express', post)
router.put('/express', put)
router.delete('/express', del)

export default (app: any) => {
  app.use(corsHandler)
  app.use(tokenChecker, (error: any, req: any, res: any, next: any) => {
    if (error) {
      return res.status(401).send({
        status: 'error',
        message: error.message
      })
    }
    next()
  })
  app.use(router)
  app.use(yebaRouter)
  app.use(authorize)
  app.use(explorer)
  app.use(article)
  app.use(user)
}
