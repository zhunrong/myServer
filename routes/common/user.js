const router = require('express').Router();
const userController = require('../../controller/common/user');
router.put('/user', userController.update);
router.get('/user', userController.get);
module.exports = router;