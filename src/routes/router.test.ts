import express from 'express'
import { get, post, put, del } from '../controller/controller.test'

const router = express.Router()

router.get('/express', get)
router.post('/express', post)
router.put('/express', put)
router.delete('/del', del)

export default router