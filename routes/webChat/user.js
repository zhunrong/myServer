const express = require('express');

const router = express.Router();

const userController = require('../../controller/webChat/user');

router.get('/user', userController.get);

router.delete('/user', userController.delete);

router.put('/user', userController.put);

router.get('/user/me', userController.getMe);

module.exports = router;