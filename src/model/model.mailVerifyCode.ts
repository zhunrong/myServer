import Model, { Options } from './model'
import config from '../config'
class MailVerifyCode extends Model {
  constructor(options: Options) {
    super(options)
  }
}

export default new MailVerifyCode({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'zr_dev',
  table: 'mail_verify_code'
})
