import Model, { Options } from '../model'
import config from '../../config'
class RechargeRecord extends Model {
  constructor(options: Options) {
    super(options)
  }
}

export default new RechargeRecord({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'yeba',
  table: 'recharge'
})
