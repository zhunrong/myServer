"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_article_1 = require("../controller/controller.article");
var router = express_1.default.Router();
router.get('/article', controller_article_1.get);
router.get('/article/:id', controller_article_1.detail);
router.post('/article', controller_article_1.post);
router.put('/article/:id', controller_article_1.put);
exports.default = router;
