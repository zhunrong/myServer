const express = require('express');
const router = express.Router();

const authorize = require('../../controller/authorize');


router.post('/login', authorize.login.bind(authorize));

router.post('/register', authorize.register.bind(authorize));


module.exports = router;