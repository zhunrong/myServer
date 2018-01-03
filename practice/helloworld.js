const express = require('express');

const app = express();

app.use(express.static('../webPage'));

// console.log(app);

app.get('/hello', (req, res) => {
    res.send('hello world');
})


const server = app.listen(9988, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(server.address());
    console.log('Example app listening at http://%s:%s', host, port);
});