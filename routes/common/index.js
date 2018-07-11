const tenxunyun = require('./tenxunyun');
const authorize = require('./authorize');


module.exports = app => {
    app.use(authorize);
    app.use(tenxunyun);
}