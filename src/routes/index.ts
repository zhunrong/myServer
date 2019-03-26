import express from 'express'
import expressJwt from 'express-jwt'
import config from '../config'
import { get, post, put, del } from '../controller/test'
import yebaRouter from './router.yeba'
import authorizeRouter from './router.authorize'
import explorerRouter from './router.explorer'
import articleRouter from './router.article'
import userRouter from './router.user'
import mailRouter from './router.mail'
import toolsRouter from './router.tools'
// CORS
const corsHandler = (req: any, res: any, next: any) => {
  const origin = req.headers.origin
  if (origin) {
    //如果是同源的，则没有origin字段
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.setHeader('Access-Control-Max-Age', 604800)
    res.setHeader('Access-Control-Allow-Credentials', 'true') //允许跨域名设置cookie
  }
  next()
}

const tokenChecker = expressJwt({
  secret: config.TOKEN_SECRET,
  requestProperty: 'auth'
}).unless((req: any) => {
  const path: string = req.path
  let isPass: boolean = false
  config.DO_NOT_CHECK_REQUEST_PATH.find((item: string | RegExp) => {
    if (typeof item === 'string' && item === path) {
      return (isPass = true)
    }
    if (item instanceof RegExp && item.test(path)) {
      return (isPass = true)
    }
    return false
  })
  return isPass
})

const testRouter = express.Router()
testRouter.get('/express', get)
testRouter.post('/express', post)
testRouter.put('/express', put)
testRouter.delete('/express', del)

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
  app.use(testRouter)
  app.use(yebaRouter)
  app.use(authorizeRouter)
  app.use(explorerRouter)
  app.use(articleRouter)
  app.use(userRouter)
  app.use(mailRouter)
  app.use(toolsRouter)
}
