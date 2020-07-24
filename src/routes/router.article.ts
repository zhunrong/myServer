import express from 'express';
import {
  getArticles,
  getAllArticles,
  getArticleDetail,
  deleteArticle,
  addTag,
  removeTag,
} from '../controller/controller.article';
const router = express.Router();

router.get('/article/all', getAllArticles);
router.get('/article/user', getArticles);
router.get('/article/:id', getArticleDetail);
router.post('/article/delete', deleteArticle);
router.post('/article/tag/add', addTag);
router.post('/article/tag/remove', removeTag);

export default router;
