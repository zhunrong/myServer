const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

/*route*/
const router = require('./routes/index');


//中间件
const bodyParser = require('body-parser');

//静态资源
app.use('/public', express.static('public'));
app.use('/html', express.static('html'));
app.use('/file', express.static('file'));


//使用中间件
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded


//使用模块化路由
router(app);

// console.log(app);
app.get('/hello', (req, res) => {
    res.send('hello world');
})



const server = app.listen(80, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(server.address());
    console.log('express app listening at http://%s:%s', host, port);
});


//socket
http.listen(3000, function () {
    console.log('a websocket server is running at 3000 port');
})
io.on('connection', function (socket) {
    console.log('a user connected');
});



