import express from 'express';
import {
  getArticles,
  getAllArticles,
  getArticleDetail,
} from '../controller/controller.article';
const router = express.Router();

router.get('/article/all', getAllArticles);
router.get('/article/user', getArticles);
router.get('/article/:id', getArticleDetail);
// router.post('/article', post);
// router.put('/article/:id', put);
// router.post('/articleDelete', deleteArticle);
// 添加文章访问记录
// router.post('/articleVisit', addVisitRecord);
export default router;
