const student = require('./student');
const upload = require('./upload');
const markdown = require('./markdown');

//web-chat router
const chat = require('./webChat');
//common
const common = require('./common');
// explorer
const explorer = require('./explorer');


module.exports = app => {

    // CORS
    app.use((req, res, next) => {
        const origin = req.headers.origin;
        if (origin) {
            //如果是同源的，则没有origin字段
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Access-Control-Max-Age', 604800);
            res.setHeader('Access-Control-Allow-Credentials', 'true'); //允许跨域名设置cookie
        }

        next();
    })

    app.use(upload);
    app.use(markdown);

    student(app);
    chat(app);
    common(app);
    explorer(app);
}