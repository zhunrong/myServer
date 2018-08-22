const student = require('./student');
const upload = require('./upload');
const markdown = require('./markdown');
const article = require('./explorer/article');

//web-chat router
const chat = require('./webChat');
//common
const common = require('./common');
// explorer
const explorer = require('./explorer');


module.exports = app => {

    app.use(upload);
    app.use(markdown);

    student(app);
    chat(app);
    common(app);
    explorer(app);
    article(app);
}