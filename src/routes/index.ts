import { Express } from 'express'
import cookieSession from 'cookie-session'
import unless, { RequestHandler } from 'express-unless'
import * as config from '../config'
import testRouter from './router.test'
import authorizeRouter from './router.authorize'
import explorerRouter from './router.explorer'
import articleRouter from './router.article'
import userRouter from './router.user'
import mailRouter from './router.mail'
import toolsRouter from './router.tools'
import pictureRouter from './router.picture'
import draftRouter from './router.draft'

// CORS
const corsHandler: RequestHandler = (req, res, next) => {
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

const cookieHandler = cookieSession({
  name: 'uid',
  secret: config.COOKIE_SECRET,
  maxAge: config.COOKIE_MAX_AGE
})

const cookieChecker: RequestHandler = (req, res, next) => {
  const uid = req.session?.uid
  if (uid) {
    return next()
  }
  res.status(401).send({
    status: 'error',
    message: '未登录'
  })
}
cookieChecker.unless = unless
const cookieCheckerUnless = cookieChecker.unless({
  path: config.DO_NOT_CHECK_REQUEST_PATH
})

export default (app: Express) => {
  app.use(corsHandler)
  app.use(cookieHandler)
  app.use(cookieCheckerUnless)
  app.use(testRouter)
  app.use(authorizeRouter)
  app.use(explorerRouter)
  app.use(articleRouter)
  app.use(userRouter)
  app.use(mailRouter)
  app.use(toolsRouter)
  app.use(pictureRouter)
  app.use(draftRouter)
}
