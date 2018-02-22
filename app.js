const express = require('express');

const app = express();

/*route*/
const router = require('./routes/index');

app.use(express.static('public'));
app.use('/html', express.static('html'));


app.use(router);
// console.log(app);

app.get('/hello', (req, res) => {
    res.send('hello world');
})


const server = app.listen(80, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(server.address());
    console.log('Example app listening at http://%s:%s', host, port);
});