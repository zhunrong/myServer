const express = require('express');
const router = express.Router();
const explorer = require('../../controller/explorer');

router.get(/^\/explorer\/.*/, explorer.get);

module.exports = app => {
    app.use(router);
}