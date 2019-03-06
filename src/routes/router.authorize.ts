import express from 'express'
import {
  login,
  register,
  mailVerifyCode
} from '../controller/controller.authorize'
const router = express.Router()
// 登录
router.post('/login', login)
// 注册
router.post('/register', register)
// 邮箱验证码
router.post('/mailVerifyCode', mailVerifyCode)

export default router
