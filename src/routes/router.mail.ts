import express from 'express';
import { sendMail } from '../controller/controller.mail';
const router = express.Router();
router.post('/mail', sendMail);

export default router;
