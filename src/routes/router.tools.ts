import express from 'express';
import { getUploadToken } from '../controller/controller.tools';
const router = express.Router();

// 获取腾讯云对象存储上传证书
router.get('/qcloud/uploadCredential', getUploadToken);

export default router;
