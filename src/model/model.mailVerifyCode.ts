import Model from './model'
import config from '../config'
class MailVerifyCode extends Model {
  async init() {
    try {
      await this.query(`
        CREATE DATABASE IF NOT EXISTS ${this.database};

        USE ${this.database};

        CREATE TABLE IF NOT EXISTS ${this.table} (
          id int(11) NOT NULL AUTO_INCREMENT,
          email varchar(255) NOT NULL,
          verify_code varchar(255) DEFAULT NULL,
          create_time timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
      `, false)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MailVerifyCode({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'zr_dev',
  table: 'mail_verify_code'
})
