import express from 'express'
import config from '../config'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import { get, post, put, del } from '../controller/test'
import yebaRouter from './router.yeba'
import authorize from './router.authorize'
import explorer from './router.explorer'
import article from './router.article'

const sessionMiddleware = session({
  cookie: {
    domain: '',
    maxAge: 30 * 60 * 1000,
    httpOnly: false,
    path: '/',
    sameSite: false,
    secure: false
  },
  name: 'system.auth',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: 'dangerous',
  store: new MySQLStore({
    host: config.DATABASE_HOST,
    port: 3306,
    user: config.USER,
    password: config.PASSWORD,
    database: config.SESSION_DATABASE
  }) as any
})
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
// session
const sessionHandler = (req: any, res: any, next: any) => {
  if (req.method === 'OPTIONS') {
    return res.send('success')
  }
  switch (req.path) {
    case '/':
      // 重定向
      res.redirect('/system')
      break
    case '/login':
    case '/register':
    case '/chat/login':
    case '/chat/register':
    case '/yeba/rechargeOrder':
      next()
      break
    default:
      if (!req.session[config.SESSION_NAME]) {
        return res.send({
          status: 'error',
          message: '用户未登录'
        })
      }
      req.session[config.SESSION_NAME] = req.session[config.SESSION_NAME]
      next()
  }
}

const router = express.Router()
router.get('/express', get)
router.post('/express', post)
router.put('/express', put)
router.delete('/express', del)

export default (app: any) => {
  app.use(sessionMiddleware)
  app.use(corsHandler, sessionHandler)
  app.use(router)
  app.use(yebaRouter)
  app.use(authorize)
  app.use(explorer)
  app.use(article)
}
