const express = require('express')
const router = express.Router()
const controller = require('../../controller/yeba/order')
// 新增一条订单记录
router.post('/yeba/rechargeOrder', controller.addOrder)
// 获取订单列表
router.get('/yeba/rechargeOrder',controller.orderList)
module.exports = app => {
  app.use(router)
}
