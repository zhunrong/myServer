import expressJwt from 'express-jwt'
import config from '../config'
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
}).unless({
  path: config.DO_NOT_CHECK_REQUEST_PATH
})

export default (app: any) => {
  app.use(corsHandler)
  app.use(tokenChecker, (error: any, req: any, res: any, next: any) => {
    if (error) {
      // 获取文章详情token可有可无
      if (/^\/article\/\S+$/.test(req.path)) {
        return next()
      }
      return res.status(401).send({
        status: 'error',
        message: error.message
      })
    }
    next()
  })
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
