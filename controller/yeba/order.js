const orderModel = require('../../model/yeba/order')

// 添加一条订单记录
exports.addOrder = (req, res) => {
  const { body } = req
  orderModel
    .post({
      barId: body.barId,
      amount: body.amount,
      url: body.url,
      type: body.type
    })
    .then(result => {
      res.send({
        message: 'ok',
        result
      })
    })
}
