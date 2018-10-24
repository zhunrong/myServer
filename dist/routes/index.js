"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_1 = require("../controller/test");
var yeba_1 = __importDefault(require("./yeba"));
var router = express_1.default.Router();
router.get('/express', test_1.get);
router.post('/express', test_1.post);
router.put('/express', test_1.put);
router.delete('/express', test_1.del);
exports.default = (function (app) {
    // console.log(app)
    app.use(router);
    app.use(yeba_1.default);
});
