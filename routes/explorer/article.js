const article = require('../../controller/explorer/article');
const router = require('express').Router();

router.get('/article', article.get);
router.post('/article', article.post);

module.exports = app => {
    app.use(router);
}