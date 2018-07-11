const express = require('express');
const config = require('./config');
const app = express();
const websocket = require('./websocket');


/* 中间件 list */
const bodyParser = require('body-parser');
const session = require('./session');

/* 静态资源 start */
app.use('/', express.static('public'));
app.use('/html', express.static('html'));
app.use('/file', express.static('file'));
app.use('/static', express.static('static'));
/* 静态资源 end */


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded



// 配置session
session(app);

/* 定义路由 start */
const router = require('./routes');
router(app);
/* 定义路由 end */




const server = app.listen(config.httpPort, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(server.address());
    console.log('express app listening at http://%s:%s', host, port);
});

//websocket
websocket(app);