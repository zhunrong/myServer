import express from 'express';
import {
  getUserInfo,
  updateUserInfo,
  updateUserPassword,
} from '../controller/controller.user';
const router = express.Router();
router.get('/user', getUserInfo);
router.put('/user', updateUserInfo);
router.put('/user/password', updateUserPassword);

export default router;
