import { Router } from 'express';
import {
  createDraft,
  deleteDraft,
  getDraft,
  updateDraft,
  getDraftList,
  syncArticle,
} from '../controller/controller.draft';

const router = Router();

router.post('/draft/create', createDraft);
router.post('/draft/delete', deleteDraft);
router.get('/draft/list', getDraftList);
router.get('/draft/:id', getDraft);
router.post('/draft/update', updateDraft);
router.post('/draft/sync', syncArticle);

export default router;
