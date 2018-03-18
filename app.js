const express = require('express');
const config = require('./config');
const app = express();
const websocket = require('./websocket');

/*route*/
const router = require('./routes/index');


//中间件
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

//静态资源
app.use('/', express.static('public'));
app.use('/html', express.static('html'));
app.use('/file', express.static('file'));


//使用中间件
// app.use(cookieParser());
app.use(cookieSession({
    name: 'uid',
    keys: ['dangerous'],
    maxAge: 60 * 1000
}))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


app.use((req, res, next) => {


    switch (req.path) {
        case '/login':
        case '/register':
            next();
            break;
        default:
            if (!req.session.uid) {
                res.send('not login');
                return;
            }
            console.log(req.session);
            req.session.uid = req.session.uid;
            next();
    }



})

//使用模块化路由
router(app);


const server = app.listen(config.httpPort, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(server.address());
    console.log('express app listening at http://%s:%s', host, port);
});

//websocket
websocket(app);