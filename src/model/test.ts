import Model, { Options } from './model'
import config from '../config'
class Test extends Model {
  constructor(options: Options) {
    super(options)
  }
}

export default new Test({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'test',
  table: 'test'
})
