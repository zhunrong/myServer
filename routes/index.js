const student = require('./student');
const upload = require('./upload');


module.exports = app => {
    app.use(student);
    app.use(upload);
}