"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("../config"));
var express_session_1 = __importDefault(require("express-session"));
var express_mysql_session_1 = __importDefault(require("express-mysql-session"));
var test_1 = require("../controller/test");
var router_yeba_1 = __importDefault(require("./router.yeba"));
var router_authorize_1 = __importDefault(require("./router.authorize"));
var router_explorer_1 = __importDefault(require("./router.explorer"));
var router_article_1 = __importDefault(require("./router.article"));
var sessionMiddleware = express_session_1.default({
    cookie: {
        domain: '',
        maxAge: 30 * 60 * 1000,
        httpOnly: false,
        path: '/',
        sameSite: false,
        secure: false
    },
    name: 'system.auth',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: 'dangerous',
    store: new express_mysql_session_1.default({
        host: config_1.default.DATABASE_HOST,
        port: 3306,
        user: config_1.default.USER,
        password: config_1.default.PASSWORD,
        database: config_1.default.SESSION_DATABASE
    })
});
// CORS
var corsHandler = function (req, res, next) {
    var origin = req.headers.origin;
    if (origin) {
        //如果是同源的，则没有origin字段
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', 604800);
        res.setHeader('Access-Control-Allow-Credentials', 'true'); //允许跨域名设置cookie
    }
    next();
};
// session
var sessionHandler = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return res.send('success');
    }
    switch (req.path) {
        case '/':
            // 重定向
            res.redirect('/system');
            break;
        case '/login':
        case '/register':
        case '/chat/login':
        case '/chat/register':
        case '/yeba/rechargeOrder':
            next();
            break;
        default:
            if (!req.session[config_1.default.SESSION_NAME]) {
                return res.send({
                    status: 'error',
                    message: '用户未登录'
                });
            }
            req.session[config_1.default.SESSION_NAME] = req.session[config_1.default.SESSION_NAME];
            next();
    }
};
var router = express_1.default.Router();
router.get('/express', test_1.get);
router.post('/express', test_1.post);
router.put('/express', test_1.put);
router.delete('/express', test_1.del);
exports.default = (function (app) {
    app.use(sessionMiddleware);
    app.use(corsHandler, sessionHandler);
    app.use(router);
    app.use(router_yeba_1.default);
    app.use(router_authorize_1.default);
    app.use(router_explorer_1.default);
    app.use(router_article_1.default);
});
