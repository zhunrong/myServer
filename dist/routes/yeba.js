"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var rechargeRecord_1 = require("../controller/yeba/rechargeRecord");
var router = express_1.default.Router();
router.get('/yeba/rechargeOrder', rechargeRecord_1.get);
router.post('/yeba/rechargeOrder', rechargeRecord_1.post);
exports.default = router;
