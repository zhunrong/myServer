import model from '../../model/yeba/model.rechargeRecord'
import moment from 'moment'
import { copyValueFromObj, timeFormat } from '../../modules/utils'

// 获取记录
export async function get(req: any, res: any) {
  const { query } = req
  const condition = copyValueFromObj(
    ['id', 'type', 'url', 'amount', 'barId'],
    query
  )
  const page: number = +query.page || 1
  const count: number = +query.count || 10
  try {
    const [{ results }, { count: total }]: [any, any] = await Promise.all([
      model.get(condition, count, page),
      model.count('id')
    ])
    results.forEach((item: any) => {
      item.time = timeFormat(item.time)
    })
    res.send({
      status: 'success',
      data: results,
      meta: {
        page,
        count,
        total
      }
    })
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}

export async function post(req: any, res: any) {
  const { body } = req
  const data = copyValueFromObj(['barId', 'amount', 'url', 'type'], body)
  try {
    const { results }: any = await model.post(data)
    res.send({
      status: 'success',
      results
    })
  } catch (error) {
    res.send({
      error,
      status: 'error'
    })
  }
}
