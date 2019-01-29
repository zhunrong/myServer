import Model, { Options } from '../model'
import config from '../../config'
class VisitRecord extends Model {
  constructor(options: Options) {
    super(options)
  }
  /**
   * 根据日期区间查询
   * @param start 开始日期
   * @param end 结束日期
   * @param type 时间类型
   * @param env 环境
   */
  getItemsBetweenDate(start: string, end: string, type = 'day', env: number) {
    let timeFormat: string = ''
    switch (type) {
      case 'day':
        timeFormat = '%Y-%m-%d'
        break
      case 'hour':
        timeFormat = '%Y-%m-%d %H'
        break
      case 'minute':
        timeFormat = '%Y-%m-%d %H:%i'
        break
      case 'second':
        timeFormat = '%Y-%m-%d %H:%i:%s'
        break
      default:
        timeFormat = '%Y-%m-%d %H'
    }
    const sql = `select id,barId,userId,username,visitUrl,type,DATE_FORMAT(visitTime,'${timeFormat}') as visitTime from ${
      this.table
    } where DATE_FORMAT(visitTime,'${timeFormat}') BETWEEN '${start}' AND '${end}' AND type=${env}`
    return this.query(sql)
  }
}

export default new VisitRecord({
  host: config.DATABASE_HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: 'yeba',
  table: 'visit'
})
