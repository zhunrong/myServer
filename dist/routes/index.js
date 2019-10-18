"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_jwt_1 = __importDefault(require("express-jwt"));
var config_1 = __importDefault(require("../config"));
var router_test_1 = __importDefault(require("./router.test"));
var router_yeba_1 = __importDefault(require("./router.yeba"));
var router_authorize_1 = __importDefault(require("./router.authorize"));
var router_explorer_1 = __importDefault(require("./router.explorer"));
var router_article_1 = __importDefault(require("./router.article"));
var router_user_1 = __importDefault(require("./router.user"));
var router_mail_1 = __importDefault(require("./router.mail"));
var router_tools_1 = __importDefault(require("./router.tools"));
var router_picture_1 = __importDefault(require("./router.picture"));
// CORS
var corsHandler = function (req, res, next) {
    var origin = req.headers.origin;
    if (origin) {
        //如果是同源的，则没有origin字段
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
        res.setHeader('Access-Control-Max-Age', 604800);
        res.setHeader('Access-Control-Allow-Credentials', 'true'); //允许跨域名设置cookie
    }
    next();
};
var tokenChecker = express_jwt_1.default({
    secret: config_1.default.TOKEN_SECRET,
    requestProperty: 'auth'
}).unless({
    path: config_1.default.DO_NOT_CHECK_REQUEST_PATH
});
exports.default = (function (app) {
    app.use(corsHandler);
    app.use(tokenChecker, function (error, req, res, next) {
        if (error) {
            return res.status(401).send({
                status: 'error',
                message: error.message
            });
        }
        next();
    });
    app.use(router_test_1.default);
    app.use(router_yeba_1.default);
    app.use(router_authorize_1.default);
    app.use(router_explorer_1.default);
    app.use(router_article_1.default);
    app.use(router_user_1.default);
    app.use(router_mail_1.default);
    app.use(router_tools_1.default);
    app.use(router_picture_1.default);
});
