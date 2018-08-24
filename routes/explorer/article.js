const article = require('../../controller/explorer/article');
const router = require('express').Router();

router.get('/article', article.get);
router.post('/article/create', article.createArticle);
router.put('/article/edit/:id', article.editArticle);

module.exports = app => {
    app.use(router);
}