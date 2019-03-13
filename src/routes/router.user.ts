import express from 'express'
import { getUserInfo, updateUserInfo } from '../controller/controller.user'
const router = express.Router()
router.get('/user', getUserInfo)

router.put('/user', updateUserInfo)

export default router
