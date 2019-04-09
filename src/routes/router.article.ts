import express from 'express'
import {
  get,
  getAll,
  detail,
  post,
  put,
  addVisitRecord
} from '../controller/controller.article'
const router = express.Router()

router.get('/article', get)
router.get('/allArticle', getAll)
router.get('/article/:id', detail)
router.post('/article', post)
router.put('/article/:id', put)
// 添加文章访问记录
router.post('/articleVisit',addVisitRecord)
export default router
