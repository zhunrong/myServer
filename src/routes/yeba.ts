import express from 'express'
import { get } from '../controller/yeba/rechargeRecord'
const router = express.Router()
router.get('/yeba/rechargeOrder', get)
export default router
