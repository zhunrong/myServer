const express = require('express');
const router = express.Router();

const authorize = require('../../controller/common/authorize');


router.post('/login', authorize.login);

router.post('/register', authorize.register);


module.exports = router;