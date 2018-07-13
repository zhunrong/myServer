const express = require('express');
const router = express.Router();
const explorer = require('../../controller/explorer');

router.get(/^\/explorer\/.*/, explorer.get);

router.post(/^\/explorer\/.*/, explorer.post);

router.delete(/^\/explorer\/.*/, explorer.delete);

module.exports = app => {
    app.use(router);
}