import express from 'express';
import { get, post, deleteFile, put } from '../controller/controller.explorer';
const router = express.Router();

router.get(/^\/explorer\/.*/, get);
router.post(/^\/explorer\/.*/, post);
router.delete(/^\/explorer\/.*/, deleteFile);
router.put(/^\/explorer\/.*/, put);

export default router;
