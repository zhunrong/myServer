/**
 * 定义各种接口
 */

/**
 * 响应数据
 */
export interface Response {
  status:string
  data?: object
  error?: string
  [key: string]: any
}