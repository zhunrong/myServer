const authorize = require('./authorize');
const user = require('./user');

module.exports = app => {
    app.use('/chat', authorize);
    app.use('/chat', user);
}