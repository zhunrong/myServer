"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_picture_1 = require("../controller/controller.picture");
var router = express_1.default.Router();
router.post('/picture', controller_picture_1.save);
exports.default = router;
