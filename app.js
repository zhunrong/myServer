const express = require('express');
const config = require('./config');
const app = express();
const websocket = require('./websocket');

/* 配置模板引擎 start */
app.set('views', './template');
app.set('view engine', 'ejs');
/* 配置模板引擎 end */

/* 定义路由 start */
const router = require('./routes/index');
router(app);
/* 定义路由 end */

//中间件
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

/* 静态资源 start */
app.use('/', express.static('public'));
app.use('/html', express.static('html'));
app.use('/file', express.static('file'));
app.use('/static', express.static('static'));
/* 静态资源 end */

//使用中间件 app.use(cookieParser());
app.use(cookieSession({
    name: config.sessionName,
    keys: ['dangerous'],
    maxAge: 30 * 60 * 1000,
    // domain: 'http://localhost:8080'
}))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

//CORS
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        //如果是同源的，则没有origin字段
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Max-Age', 604800);
        res.setHeader('Access-Control-Allow-Credentials', 'true'); //允许跨域名设置cookie
    }

    next();
})

//session check
app.use((req, res, next) => {

    if (req.method === 'OPTIONS') {
        res.send('ok');
        return;
    }
    switch (req.path) {
        case '/login':
        case '/register':
        case '/chat/login':
        case '/chat/register':
        case '/explorer/':
            next();
            break;
        default:
            if (!req.session[config.sessionName]) {
                res.status(400).send({
                    error: "用户未登陆",
                    code: 1010
                });
                return;
            }
            req.session[config.sessionName] = req.session[config.sessionName];
            next();
    }
})




const server = app.listen(config.httpPort, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(server.address());
    console.log('express app listening at http://%s:%s', host, port);
});

//websocket
websocket(app);