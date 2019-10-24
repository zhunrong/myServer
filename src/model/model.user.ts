import Model from './model'
import config from '../config'
class User extends Model {
  async init() { 
    // try {
    //   await this.query(`
    //     CREATE DATABASE IF NOT EXISTS ${this.database};

    //     USE ${this.database};

    //     CREATE TABLE IF NOT EXISTS ${this.table} (
    //       id int(10) unsigned NOT NULL AUTO_INCREMENT,
    //       password varchar(255) NOT NULL,
    //       nickname varchar(255) DEFAULT NULL,
    //       avatar varchar(255) DEFAULT NULL,
    //       create_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    //       update_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    //       email varchar(255) NOT NULL,
    //       PRIMARY KEY (id)
    //     ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
    //   `,false)
    // } catch (error) {
    //   console.log(error)
    // }
  }
}

export default new User({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'zr_dev',
  table: 'user'
})
