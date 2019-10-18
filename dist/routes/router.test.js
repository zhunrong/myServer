"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_test_1 = require("../controller/controller.test");
var router = express_1.default.Router();
router.get('/express', controller_test_1.get);
router.post('/express', controller_test_1.post);
router.put('/express', controller_test_1.put);
router.delete('/del', controller_test_1.del);
exports.default = router;
