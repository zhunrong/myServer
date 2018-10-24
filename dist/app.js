"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = __importDefault(require("./config"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
// 静态资源托管
app.use('/', express_1.default.static(path_1.default.resolve(__dirname, '../static/public')));
// 解析json请求数据
app.use(body_parser_1.default.json());
// 解析urlencoded请求数据
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
routes_1.default(app);
app.listen(config_1.default.PORT, function () {
    console.log('server is running');
});
