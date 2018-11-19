import Model, { Options } from './model'
import config from '../config'
class Authorize extends Model {
  constructor(options: Options) {
    super(options)
  }
}

export default new Authorize({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'zr_dev',
  table: 'user'
})
