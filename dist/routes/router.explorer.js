"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_explorer_1 = require("../controller/controller.explorer");
var router = express_1.default.Router();
router.get(/^\/explorer\/.*/, controller_explorer_1.get);
router.post(/^\/explorer\/.*/, controller_explorer_1.post);
router.delete(/^\/explorer\/.*/, controller_explorer_1.deleteFile);
router.put(/^\/explorer\/.*/, controller_explorer_1.put);
exports.default = router;
