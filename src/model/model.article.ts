import Model, { Options } from './model'
import config from '../config'
class Article extends Model {
  constructor(options: Options) {
    super(options)
    this.init()
  }
  private async init() {
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
  /**
   * 获取文章列表(某个用户)
   * @param uid
   */
  getArticles(
    uid?: number,
    page: number = 1,
    pageSize: number = 10
  ): Promise<any> {
    let sql = `
              select 
                ${this.table}.id,
                uid,
                title,
                DATE_FORMAT(${this.table}.create_at,'%Y-%m-%d %h:%i:%s') as createTime,
                DATE_FORMAT(${this.table}.update_at,'%Y-%m-%d %h:%i:%s') as updateTime,
                nickname,
                avatar
              from
                ${this.table},user
              where
                uid=user.id
              limit
                ${pageSize}
              offset
                ${(page - 1) * pageSize};
              select
                count(id) as total,
                ${page} as page,
                ${pageSize} as pageSize
              from
                ${this.table};
              `
    return this.query(sql)
  }
  /**
   * 获取文章详情
   * @param uid
   * @param id
   */
  getArticleDetail(id: number, uid?: number): Promise<any> {
    let sql = `select
                  ${this.table}.id as id,
                  uid,
                  title,
                  markdown,
                  DATE_FORMAT(${
                    this.table
                  }.create_at,'%Y-%m-%d %h:%i:%s') as createTime,
                  DATE_FORMAT(${
                    this.table
                  }.update_at,'%Y-%m-%d %h:%i:%s') as updateTime,
                  nickname,
                  email,
                  avatar
              from ${this.table},user
              where 
                  ${this.table}.id=${id} and ${this.table}.uid=user.id`
    return this.query(sql)
  }
}

export default new Article({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'zr_dev',
  table: 'article'
})
