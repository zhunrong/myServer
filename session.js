const config = require('./config');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const middleWare = session({
    cookie: {
        domain: '',
        maxAge: 30 * 60 * 1000,
        httpOnly: true,
        path: '/',
        sameSite: false,
        secure: false
    },
    name: 'express.sid',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: 'dangerous',
    store: new MySQLStore({
        host: config.dbHost,
        port: 3306,
        user: config.dbUsername,
        password: config.dbPassword,
        database: 'web_chat'
    })
})

module.exports = app => {
    app.use(middleWare);

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