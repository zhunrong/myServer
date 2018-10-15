const Base = require('../base')
const config = require('../../config')

class Order extends Base {
  constructor(options) {
    super(options)
  }
}

module.exports = new Order({
  host: config.dbHost,
  user: config.dbUsername,
  password: config.dbPassword,
  database: 'yeba',
  tableName: 'recharge'
})
