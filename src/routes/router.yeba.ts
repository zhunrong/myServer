import express from 'express'
import {
  get,
  post,
  statistic
} from '../controller/yeba/controller.rechargeRecord'
const router = express.Router()
router.get('/yeba/rechargeOrder', get)
router.post('/yeba/rechargeOrder', post)
// 统计
router.post('/yeba/rechargeOrder/statistic', statistic)
export default router
