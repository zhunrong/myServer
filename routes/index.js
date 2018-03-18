const student = require('./student');
const upload = require('./upload');
const markdown = require('./markdown');
const authorize = require('./authorize');


module.exports = app => {
    app.use(student);
    app.use(upload);
    app.use(markdown);
    app.use(authorize);
}