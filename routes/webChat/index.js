const authorize = require('./authorize');


module.exports = app => {
    app.use('/chat', authorize);
}