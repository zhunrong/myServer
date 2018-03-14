const student = require('./student');
const upload = require('./upload');
const markdown = require('./markdown');


module.exports = app => {
    app.use(student);
    app.use(upload);
    app.use(markdown);
}