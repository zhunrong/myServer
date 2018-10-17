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

// 订单列表
exports.orderList = (req, res) => {
  const { query } = req
  const { _page, _perPage } = query
  const page = +_page || 1
  const perPage = +_perPage || 10
  Promise.all([
    orderModel.get({ _perPage: perPage, _page: page }),
    orderModel.count('id')
  ]).then(results => {
    res.send({
      message: 'ok',
      list: results[0],
      total: results[1]['id'],
      perPage,
      page
    })
  })
}
