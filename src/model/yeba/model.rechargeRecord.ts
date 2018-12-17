import Model, { Options } from '../model'
import config from '../../config'
class RechargeRecord extends Model {
  constructor(options: Options) {
    super(options)
  }

  /**
   * 获取id大于指定值的数据
   * @param id 
   * @param count 
   */
  getItemsMoreThanId(id:number,count:number=100){
    const sql=`select * from ${this.table} where id>=${id} limit ${count}`
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
