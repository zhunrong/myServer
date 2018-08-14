const tenxunyun = require('./tenxunyun');
const authorize = require('./authorize');
const user = require('./user');


module.exports = app => {
    app.use(authorize);
    app.use(tenxunyun);
    app.use(user);
}