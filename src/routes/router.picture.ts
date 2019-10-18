import express from 'express'
import { save } from '../controller/controller.picture'

const router = express.Router()

router.post('/picture', save)

export default router