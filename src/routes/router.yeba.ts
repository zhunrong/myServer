import express from 'express'
import {
  get,
  post,
  statistic
} from '../controller/yeba/controller.rechargeRecord'
import {
  addVisitRecord,
  getVisitRecord,
  getVisitStatistic
} from '../controller/yeba/controller.visitRecord'
const router = express.Router()
// 充值记录
router.get('/yeba/rechargeOrder', get)
router.post('/yeba/rechargeOrder', post)
// 充值记录统计
router.post('/yeba/rechargeOrder/statistic', statistic)

// 访问记录
router.post('/yeba/visit', addVisitRecord)
router.get('/yeba/visit', getVisitRecord)
router.post('/yeba/visit/statistic', getVisitStatistic)
export default router
