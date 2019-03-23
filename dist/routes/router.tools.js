"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_tools_1 = require("../controller/controller.tools");
var router = express_1.default.Router();
// 获取腾讯云对象存储上传证书
router.get('/qcloud/uploadCredential', controller_tools_1.getUploadToken);
exports.default = router;
