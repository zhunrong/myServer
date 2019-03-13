"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_user_1 = require("../controller/controller.user");
var router = express_1.default.Router();
router.get('/user', controller_user_1.getUserInfo);
router.put('/user', controller_user_1.updateUserInfo);
exports.default = router;
