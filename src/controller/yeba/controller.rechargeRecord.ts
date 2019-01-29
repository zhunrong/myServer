import model from '../../model/yeba/model.rechargeRecord'
import moment from 'moment'
import { copyValueFromObj, timeFormat } from '../../modules/utils'
import { Response } from '../../interface/interface'

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
    const successResponse: Response = {
      status:'success',
      data: results,
      meta: {
        page,
        count,
        total
      }
    }
    res.send(successResponse)
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}

// 新增一条记录
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

// 统计数据
export async function statistic(req: any, res: any) {
  const { timeType = 'day', start, end, category = 'time' } = req.body
  switch (timeType) {
    case 'day':
      const pattern = /\d{4}-\d{2}-\d{2}/
      if (!pattern.test(start)) {
        return res.send({
          status: 'error',
          message: '{start}格式：YYYY-mm-dd'
        })
      }
      if (!pattern.test(end)) {
        return res.send({
          status: 'error',
          message: '{end}格式：YYYY-mm-dd'
        })
      }
      break
  }
  try {
    const { results }: any = await model.getItemsBetweenDate(
      start,
      end,
      timeType
    )
    res.send({
      status: 'success',
      data: statisticFunction[category](results)
    })
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}
// 统计函数集合
const statisticFunction: any = {
  // 按时间统计
  time(results: any) {
    const statisticObject: any = {}
    results.forEach((item: any) => {
      if (!statisticObject[item.time]) {
        statisticObject[item.time] = {
          amount: 0,
          time: item.time,
          count: 0
        }
      }
      statisticObject[item.time].amount += item.amount
      statisticObject[item.time].count++
    })
    const statisticArray: any[] = []
    for (let key in statisticObject) {
      const item = statisticObject[key]
      item.amount = Math.round(item.amount)
      statisticArray.push(item)
    }
    return statisticArray
  },
  // 按酒吧id统计
  bar(results: any) {
    const statisticObject: any = {}
    results.forEach((item: any) => {
      if (!statisticObject[item.barId]) {
        statisticObject[item.barId] = {
          amount: 0,
          barId: item.barId,
          count: 0
        }
      }
      statisticObject[item.barId].amount += item.amount
      statisticObject[item.barId].count++
    })
    const statisticArray: any[] = []
    for (let key in statisticObject) {
      const item = statisticObject[key]
      item.amount = Math.round(item.amount)
      statisticArray.push(item)
    }
    return statisticArray
  }
}
