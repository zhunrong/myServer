import Model, { Options } from './model'
import config from '../config'
class Article extends Model {
  constructor(options: Options) {
    super(options)
    this.init()
  }
  async init() {
    await this.query(
      `
      CREATE TABLE IF NOT EXISTS article (
          id int(11) NOT NULL AUTO_INCREMENT,
          uid int(11) NOT NULL,
          title varchar(255) DEFAULT '',
          markdown text,
          html text,
          create_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          update_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
    `
    )
  }
}

export default new Article({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'zr_dev',
  table: 'article'
})
