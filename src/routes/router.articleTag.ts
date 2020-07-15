import express from 'express';
import {
  getArticleTags,
  createArticleTag,
  updateArticleTag,
  removeArticleTag,
} from '../controller/controller.articleTag';

const router = express.Router();

router.get('/articleTag/list', getArticleTags);
router.post('/articleTag/create', createArticleTag);
router.post('/articleTag/update', updateArticleTag);
router.post('/articleTag/delete', removeArticleTag);

export default router;
