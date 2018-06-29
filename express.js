const express = require('express');
const app = express();
// console.dir(express);


app.use(express.static('./file', {
    maxAge: 30 * 1000
}));

app.listen(80, function () {
    console.log('server is created');
})