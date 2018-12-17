import Model, { Options } from '../model'
import config from '../../config'
import { objectToKeyValue } from '../../modules/utils'
class RechargeRecord extends Model {
  constructor(options: Options) {
    super(options)
  }
  /**
   * 查询数据
   * @param options 查询条件
   * @param count 每页的数量
   * @param page 查询页数
   */
  public get(options?: any, count?: number, page?: number) {
    return new Promise(async (resolve, reject) => {
      const { table } = this
      let sql = `select id,barId,amount,url,type,DATE_FORMAT(time,'%Y-%m-%d %h:%i:%s') as time from ${table}`
      if (typeof options === 'object') {
        const condition = objectToKeyValue(options, ' and ')
        if (condition) {
          sql += ` where ${condition}`
        }
      }
      if (typeof count === 'number') {
        sql += ` limit ${count}`
        if (typeof page === 'number') {
          sql += ` offset ${count * (page - 1)}`
        }
      }
      try {
        const { results, connection, fields }: any = await this.query(sql)
        resolve({ results, fields })
        connection.end()
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 获取id大于指定值的数据
   * @param id
   * @param count
   */
  getItemsMoreThanId(id: number, count: number = 100) {
    const sql = `select * from ${this.table} where id>=${id} limit ${count}`
    return this.query(sql)
  }
  /**
   * 读取数据
   * @param offset 偏移量
   * @param limit 最大数目
   */
  getItems(offset: number = 0, limit: number = 100) {
    const sql = `select * from ${this.table} limit ${limit} offset ${offset}`
    return this.query(sql)
  }
  /**
   * 根据日期查询
   * @param date 日期字符串 2018-10-10
   */
  getItemsByDate(date: string) {
    const sql = `select * from ${
      this.table
    } where DATE_FORMAT(time,'%Y-%m-%d')='${date}'`
    return this.query(sql)
  }
  /**
   * 根据日期区间查询
   * @param start 开始日期
   * @param end 结束日期
   */
  getItemsBetweenDate(start: string, end: string, type = 'day') {
    let sql = ''
    switch (type) {
      case 'day':
        sql = `select id,barId,amount,url,type,DATE_FORMAT(time,'%Y-%m-%d') as time from ${
          this.table
        } where DATE_FORMAT(time,'%Y-%m-%d') BETWEEN '${start}' AND '${end}'`
        break
    }

    return this.query(sql)
  }
}

export default new RechargeRecord({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'yeba',
  table: 'recharge'
})
