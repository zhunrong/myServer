import express from 'express';
import { save, getPictures } from '../controller/controller.picture';

const router = express.Router();

router.post('/picture', save);

router.get('/picture', getPictures);

export default router;
