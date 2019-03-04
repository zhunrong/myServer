"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_mail_1 = require("../controller/controller.mail");
var router = express_1.default.Router();
router.post('/mail', controller_mail_1.sendMail);
exports.default = router;
