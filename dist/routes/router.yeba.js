"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_rechargeRecord_1 = require("../controller/yeba/controller.rechargeRecord");
var router = express_1.default.Router();
router.get('/yeba/rechargeOrder', controller_rechargeRecord_1.get);
router.post('/yeba/rechargeOrder', controller_rechargeRecord_1.post);
// 统计
router.post('/yeba/rechargeOrder/statistic', controller_rechargeRecord_1.statistic);
exports.default = router;
