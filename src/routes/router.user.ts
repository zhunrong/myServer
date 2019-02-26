import express from 'express'
import { getUserInfo } from '../controller/controller.user'
const router = express.Router()
router.get('/user', getUserInfo)

export default router
