"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_session_1 = __importDefault(require("cookie-session"));
var express_unless_1 = __importDefault(require("express-unless"));
var config = __importStar(require("../config"));
var router_test_1 = __importDefault(require("./router.test"));
var router_authorize_1 = __importDefault(require("./router.authorize"));
var router_explorer_1 = __importDefault(require("./router.explorer"));
var router_article_1 = __importDefault(require("./router.article"));
var router_user_1 = __importDefault(require("./router.user"));
var router_mail_1 = __importDefault(require("./router.mail"));
var router_tools_1 = __importDefault(require("./router.tools"));
var router_picture_1 = __importDefault(require("./router.picture"));
var router_draft_1 = __importDefault(require("./router.draft"));
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
var cookieHandler = cookie_session_1.default({
    name: 'uid',
    secret: config.COOKIE_SECRET,
    maxAge: config.COOKIE_MAX_AGE
});
var cookieChecker = function (req, res, next) {
    var _a;
    var uid = (_a = req.session) === null || _a === void 0 ? void 0 : _a.uid;
    if (uid) {
        return next();
    }
    res.status(401).send({
        status: 'error',
        message: '未登录'
    });
};
cookieChecker.unless = express_unless_1.default;
var cookieCheckerUnless = cookieChecker.unless({
    path: config.DO_NOT_CHECK_REQUEST_PATH
});
exports.default = (function (app) {
    app.use(corsHandler);
    app.use(cookieHandler);
    app.use(cookieCheckerUnless);
    app.use(router_test_1.default);
    app.use(router_authorize_1.default);
    app.use(router_explorer_1.default);
    app.use(router_article_1.default);
    app.use(router_user_1.default);
    app.use(router_mail_1.default);
    app.use(router_tools_1.default);
    app.use(router_picture_1.default);
    app.use(router_draft_1.default);
});
