import testModel from '../model/test'
import { copyValueFromObj } from '../modules/utils'
export async function get(req: any, res: any) {
  const { query } = req
  const condition: any = copyValueFromObj(['name', 'value'], query)
  let page: number = query.page ? +query.page : 1
  let count: number | undefined = query.count ? +query.count : undefined
  try {
    const [{ results }, { count: total }]: [any, any] = await Promise.all([
      testModel.get(condition, count, page),
      testModel.count('id')
    ])
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
  try {
    const { results }: any = await testModel.post(body)
    res.send({
      status: 'success',
      data: results
    })
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}

export async function put(req: any, res: any) {
  const { body } = req
  const updateData = copyValueFromObj(['name', 'value'], body)
  const condition = copyValueFromObj(['id'], body)
  try {
    const { results }: any = await testModel.put(updateData, condition)
    res.send({
      status: 'success',
      data: results
    })
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}

export async function del(req: any, res: any) {
  const { body } = req
  const condition = copyValueFromObj(['id'], body)
  try {
    const { results }: any = await testModel.delete(condition)
    res.send({
      status: 'success',
      data: results
    })
  } catch (error) {
    res.send({
      status: 'error',
      error
    })
  }
}
