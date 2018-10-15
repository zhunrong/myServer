const express = require('express')
const router = express.Router()
const controller = require('../../controller/yeba/order')
// 新增一条订单记录
router.post('/yeba/rechargeOrder', controller.addOrder)
module.exports = app => {
  app.use(router)
}
