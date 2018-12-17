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
    // results.forEach((item: any) => {
    //   item.time = timeFormat(item.time)
    // })
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
  const { timeType = 'day', start, end } = req.body
  switch (timeType) {
    case 'day':
      const pattern = /\d{4}-\d{2}-\d{2}/
      if (!pattern.test(start)) {
        return res.send({
          status: 'error',
          message: '{start}不能为非法值'
        })
      }
      if (!pattern.test(end)) {
        return res.send({
          status: 'error',
          message: '{end}不能为非法值'
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
    res.send({
      status: 'success',
      data: statisticArray
    })
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}

let offset = 0
let limit = 2
async function temp() {
  try {
    const { results }: any = await model.getItems(offset, limit)
    results.forEach((item: any) => {
      console.log(item)
    })
  } catch (error) {
    console.log(error)
  }
}

// temp()
