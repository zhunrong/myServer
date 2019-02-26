import userModel from '../model/model.user'

/**
 * 获取用户信息
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
