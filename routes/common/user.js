const router = require('express').Router;
const userController = require('../../controller/common/user');
router.post('/user/update', userController.update);

module.exports = router;