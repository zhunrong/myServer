const express = require('express');
const router = express.Router();
const tenxunyunController = require('../../controller/common/tenxunyun');

router.post('/sign', tenxunyunController.tenxunyun);

module.exports = router