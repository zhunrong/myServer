import express from 'express';
import {
  login,
  logout,
  register,
  mailVerifyCode,
} from '../controller/controller.authorize';
const router = express.Router();
// 登录
router.post('/login', login);
router.post('/logout', logout);
// 注册
router.post('/register', register);
// 邮箱验证码
router.post('/mailVerifyCode', mailVerifyCode);

export default router;
