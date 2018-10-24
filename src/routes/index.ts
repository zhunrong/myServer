import express from 'express'
import { get, post, put, del } from '../controller/test'
import yebaRouter from './yeba'
const router = express.Router()
router.get('/express', get)
router.post('/express', post)
router.put('/express', put)
router.delete('/express', del)
export default (app: any) => {
  // console.log(app)
  app.use(router)
  app.use(yebaRouter)
}
