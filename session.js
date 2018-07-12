const config = require('./config');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const middleWare = session({
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
    store: new MySQLStore({
        host: config.dbHost,
        port: 3306,
        user: config.dbUsername,
        password: config.dbPassword,
        database: 'session_db'
    })
})

module.exports = app => {
    app.use(middleWare);

    // CORS
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

    // session check
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
}