import mysql from 'mysql'
import { objectToKeyValue } from '../modules/utils'
export interface Options {
  host: string
  user: string
  password: string
  database: string
  table: string
}
export default class Model {
  private host: string
  private user: string
  private password: string
  public database: string
  public table: string

  constructor({ host, user, password, database, table }: Options) {
    this.host = host
    this.user = user
    this.password = password
    this.database = database
    this.table = table
    this.init()
  }
  protected connect(useDataBase = true) {
    return mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: useDataBase ? this.database : undefined,
      multipleStatements: true
    })
  }
  /**
   * 查询数据
   * @param options 查询条件
   * @param count 每页的数量
   * @param page 查询页数
   */
  public get(options?: any, count?: number, page?: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { table } = this
      let sql = `select * from ${table}`
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
   * 插入数据
   * @param options
   */
  public post(options: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (typeof options === 'object') {
        const { table } = this
        // waiting
        const keys = Object.keys(options)
        const values = keys.map(key => `'${options[key]}'`)
        const sql = `insert into ${table} 
                     (${keys.join(',')})
                     values
                     (${values.join(',')})`
        const { results, connection, fields }: any = await this.query(sql)
        resolve({ results, fields })
        connection.end()
      } else {
        reject('typeof options !== object')
      }
    })
  }
  /**
   * 更新数据
   * @param updateData 要更新的字段对象
   * @param condition 条件
   */
  public put(updateData: any, condition?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { table } = this
      const updateString = objectToKeyValue(updateData, ',')
      let sql = `update ${table} set ${updateString}`
      if (typeof condition === 'object') {
        const conditionString = objectToKeyValue(condition, ' and ')
        if (conditionString) {
          sql += ` where ${conditionString}`
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
   * 删除数据
   * @param condition 条件
   */
  public delete(condition?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { table } = this
      let sql = `delete from ${table}`
      if (typeof condition === 'object') {
        const conditionString = objectToKeyValue(condition, ' and ')
        if (conditionString) {
          sql += ` where ${conditionString}`
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
   * 根据字段名查询数量
   * @param columnName 字段名
   */
  public count(columnName: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { table } = this
      const sql = `select count(${columnName}) from ${table}`
      try {
        const { results, connection, fields }: any = await this.query(sql)
        resolve({ results, fields, count: results[0][`count(${columnName})`] })
        connection.end()
      } catch (e) {
        reject(e)
      }
    })
  }
  /**
   * 执行sql
   * @param sql
   */
  public query(sql: string, useDataBase = true): Promise<any> {
    const connection = this.connect(useDataBase)
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, results, fields) => {
        if (error) {
          return reject(error)
        }
        resolve({
          results,
          fields,
          connection
        })
      })
    })
  }

  /**
   * 初始化
   */
  public init() { }
}
