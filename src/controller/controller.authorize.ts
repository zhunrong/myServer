import model from '../model/model.authorize'
import jwt from 'jsonwebtoken'
import config from '../config'
export async function login(req: any, res: any) {
  const { username, password } = req.body
  try {
    const { results }: any = await model.get({ username })
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
    // 生成token
    const maxAge: number = config.TOKEN_MAX_AGE
    const token: string = jwt.sign(
      {
        uid: user.id,
        exp: Math.floor(Date.now() / 1000) + maxAge
      },
      config.TOKEN_SECRET
    )
    res.send({
      status: 'success',
      user,
      authorization: {
        token,
        maxAge
      }
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
    const { results }: any = await model.get({ username })
    const user = results[0]
    if (user) {
      return res.send({
        status: 'error',
        message: '用户已存在'
      })
    }
    // 添加新用户
    await model.post({
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
