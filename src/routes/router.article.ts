import express from 'express'
import {
  get,
  getAll,
  detail,
  post,
  put
} from '../controller/controller.article'
const router = express.Router()

router.get('/article', get)
router.get('/allArticle', getAll)
router.get('/article/:id', detail)
router.post('/article', post)
router.put('/article/:id', put)
export default router
