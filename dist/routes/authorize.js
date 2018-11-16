"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authorize_1 = require("../controller/authorize");
var router = express_1.default.Router();
router.post('/login', authorize_1.login);
router.post('/register', authorize_1.register);
exports.default = router;
