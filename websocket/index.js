const http = require('http');
const socketIO = require('socket.io');
const config = require('../config');

module.exports = app => {
    const server = http.Server(app);
    const io = socketIO(server);

    //socket
    server.listen(config.websocketPort, () => {
        console.log('a websocket server is running at 3000 port');
    })

    io.on('connection', socket => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        })

        socket.on('message', msg => {
            console.log(msg);
        })

    });

    setInterval(() => {
        io.emit('clock', {
            time: new Date()
        });
    }, 1000)

}