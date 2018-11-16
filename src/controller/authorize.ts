import authorizeModel from '../model/authorize'
import config from '../config'
export async function login(req: any, res: any) {
  const { username, password } = req.body
  try {
    const { results }: any = await authorizeModel.get({ username })
    const user = results[0]
    if (!user) {
      return res.send({
        status: 'error',
        message: '用户不存在'
      })
    }
    if (user.password !== password) {
      return res.send({
        status: 'error',
        message: '密码不正确'
      })
    }
    req.session[config.SESSION_NAME] = user.id
    res.send({
      status: 'success',
      user
    })
  } catch (error) {
    res.send({
      error,
      status: 'error'
    })
  }
}

export async function register(req: any, res: any) {
  const { username, password } = req.body
  try {
    const { results }: any = await authorizeModel.get({ username })
    const user = results[0]
    if (user) {
      return res.send({
        status: 'error',
        message: '用户已存在'
      })
    }
    // 添加新用户
    await authorizeModel.post({
      username,
      password
    })
    login(req, res)
  } catch (error) {
    res.send({
      error,
      status: 'error'
    })
  }
}
