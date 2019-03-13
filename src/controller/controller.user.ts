import userModel from '../model/model.user'
import { copyValueFromObj } from '../modules/utils'
/**
 * 获取当前登录用户信息
 * @param req
 * @param res
 */
export async function getUserInfo(req: any, res: any) {
  const { uid } = req.auth
  try {
    const { results }: any = await userModel.get({
      id: uid
    })
    res.send({
      status: 'success',
      user: results[0]
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}

/**
 * 更新当前登录用户信息
 * @param req
 * @param res
 */
export async function updateUserInfo(req: any, res: any) {
  const { uid } = req.auth
  try {
    const data: any = copyValueFromObj(['nickname', 'avatar'], req.body)
    if (!data.nickname) {
      throw new Error('昵称不能为空')
    }
    await userModel.put(data, {
      id: uid
    })
    getUserInfo(req, res)
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}
