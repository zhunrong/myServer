import model from '../../model/yeba/model.visitRecord'
import { Response } from '../../interface/interface'
import { copyValueFromObj } from '../../modules/utils'
/**
 * 添加一条记录
 * @param req
 * @param res
 */
export async function addVisitRecord(req: any, res: any) {
  const { body } = req
  const data = copyValueFromObj(
    ['userId', 'visitUrl', 'type', 'username', 'barId'],
    body
  )
  try {
    const { results }: any = await model.post(data)
    const successResponse: Response = {
      status: 'success',
      data: results
    }
    res.send(successResponse)
  } catch (error) {
    const errorResponse: Response = {
      status: 'error',
      error
    }
    res.send(errorResponse)
  }
}

/**
 * 获取访问记录
 * @param req
 * @param res
 */
export async function getVisitRecord(req: any, res: any) {
  const { query } = req
  const condition = copyValueFromObj(['userId', 'barId', 'type'], query)
  const page: number = +query.page || 1
  const count: number = +query.count || 10
  try {
    const [{ results }, { count: total }]: any = await Promise.all([
      model.get(condition, count, page),
      model.count('id')
    ])
    const successResponse: Response = {
      status: 'success',
      data: results,
      meta: {
        page,
        count,
        total
      }
    }
    res.send(successResponse)
  } catch (error) {
    const errorResponse: Response = {
      status: 'error',
      error
    }
    res.send(errorResponse)
  }
}

/**
 * 获取访问统计
 * @param req
 * @param res
 */
export async function getVisitStatistic(req: any, res: any) {
  const {
    timeType = 'day',
    start,
    end,
    category = 'time',
    type = 2 // 2是正式服 
  } = req.body
  let pattern
  switch (timeType) {
    case 'day':
      pattern = /^\d{4}-\d{2}-\d{2}$/
      if (!pattern.test(start)) {
        return res.send({
          status: 'error',
          message: '{start}格式：yyyy-mm-dd'
        })
      }
      if (!pattern.test(end)) {
        return res.send({
          status: 'error',
          message: '{end}格式：yyyy-mm-dd'
        })
      }
      break
    case 'hour':
      pattern = /^\d{4}-\d{2}-\d{2} \d{2}$/
      if (!pattern.test(start)) {
        return res.send({
          status: 'error',
          message: '{start}格式：yyyy-mm-dd hh'
        })
      }
      if (!pattern.test(end)) {
        return res.send({
          status: 'error',
          message: '{end}格式：yyyy-mm-dd hh'
        })
      }
      break
    case 'minute':
      pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
      if (!pattern.test(start)) {
        return res.send({
          status: 'error',
          message: '{start}格式：yyyy-MM-dd hh:mm'
        })
      }
      if (!pattern.test(end)) {
        return res.send({
          status: 'error',
          message: '{end}格式：yyyy-MM-dd hh:mm'
        })
      }
      break
    case 'second':
      pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
      if (!pattern.test(start)) {
        return res.send({
          status: 'error',
          message: '{start}格式：yyyy-MM-dd hh:mm:ss'
        })
      }
      if (!pattern.test(end)) {
        return res.send({
          status: 'error',
          message: '{end}格式：yyyy-MM-dd hh:mm:ss'
        })
      }
      break
    default:
      return res.send({
        status: 'error',
        message: '不支持的timeType'
      })
  }
  try {
    const { results }: any = await model.getItemsBetweenDate(
      start,
      end,
      timeType,
      type
    )
    const successResponse: Response = {
      status: 'success',
      data: statisticFunction[category](results)
    }
    res.send(successResponse)
  } catch (error) {
    const errorResponse: Response = {
      status: 'success',
      error: JSON.stringify(error)
    }
    res.send(errorResponse)
  }
}

// 统计函数集合
const statisticFunction: any = {
  // 按时间统计
  time(results: any) {
    const statisticObject: any = {}
    results.forEach((item: any) => {
      if (!statisticObject[item.visitTime]) {
        statisticObject[item.visitTime] = {
          count: 0,
          visitTime: item.visitTime
        }
      }
      statisticObject[item.visitTime].count++
    })
    const statisticArray: any[] = []
    for (let key in statisticObject) {
      const item = statisticObject[key]
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
