import express from 'express'
import { get, post } from '../controller/yeba/controller.rechargeRecord'
const router = express.Router()
router.get('/yeba/rechargeOrder', get)
router.post('/yeba/rechargeOrder', post)
export default router
