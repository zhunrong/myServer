"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_rechargeRecord_1 = require("../controller/yeba/controller.rechargeRecord");
var controller_visitRecord_1 = require("../controller/yeba/controller.visitRecord");
var router = express_1.default.Router();
// 充值记录
router.get('/yeba/rechargeOrder', controller_rechargeRecord_1.get);
router.post('/yeba/rechargeOrder', controller_rechargeRecord_1.post);
// 充值记录统计
router.post('/yeba/rechargeOrder/statistic', controller_rechargeRecord_1.statistic);
// 访问记录
router.post('/yeba/visit', controller_visitRecord_1.addVisitRecord);
router.get('/yeba/visit', controller_visitRecord_1.getVisitRecord);
router.post('/yeba/visit/statistic', controller_visitRecord_1.getVisitStatistic);
exports.default = router;
