import model from '../../model/yeba/rechargeRecord'
import { copyValueFromObj } from '../../modules/utils'
export async function get(req: any, res: any) {
  const { query } = req
  const condition = copyValueFromObj(['id', 'type', 'url', 'amount'], query)
  try {
    const { results }: any = await model.get(condition)
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
