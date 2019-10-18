import Model from './model'
import config from '../config'
class UserPicture extends Model {
  async init() {
    try {
      await this.query(`
        CREATE DATABASE IF NOT EXISTS ${this.database};

        USE ${this.database};

        CREATE TABLE IF NOT EXISTS ${this.table} (
          id int(10) unsigned NOT NULL AUTO_INCREMENT,
          uid int(11) NOT NULL,
          directory varchar(255) NOT NULL,
          filename varchar(255) NOT NULL,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

      `, false)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UserPicture({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'zr_dev',
  table: 'user_pictures'
})