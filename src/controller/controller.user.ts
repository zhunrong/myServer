import { copyValueFromObj } from '../modules/utils'
import * as service from '../service/service.user'

/**
 * 获取当前登录用户信息
 * @param req
 * @param res
 */
export async function getUserInfo(req: any, res: any) {
  try {
    const { uid } = req.auth
    const user = await service.getUserInfo(uid)
    res.send({
      status: 'success',
      user
    })
    if (!user) {
      throw new Error('用户不存在')
    }
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
    await service.updateUserInfo(uid, data)
    getUserInfo(req, res)
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}
