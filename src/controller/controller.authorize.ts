import mailVerifyCodeModel from '../model/model.mailVerifyCode'
import * as userService from '../service/service.user'
import jwt from 'jsonwebtoken'
import config from '../config'
import sendMail from '../modules/mailer'
import { randomCharacter } from '../modules/utils'

/**
 * 登录
 * @param req
 * @param res
 * email 邮箱
 * password 密码
 */
export async function login(req: any, res: any) {
  const { email, password } = req.body
  try {
    if (!email) {
      throw new Error('邮箱不能为空')
    }
    if (!password) {
      throw new Error('密码不能为空')
    }
    const user = await userService.getUserByEmail(email)
    if (!user) {
      throw new Error('用户不存在')
    }
    if (user.password !== password) {
      throw new Error('密码不正确')
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
      authorization: {
        token,
        maxAge
      }
    })
  } catch ({ message }) {
    res.send({
      message,
      status: 'error'
    })
  }
}

/**
 * 注册
 * @param req
 * @param res
 * email 邮箱
 * password 密码
 * verifyCode 验证码
 */
export async function register(req: any, res: any) {
  const { email, verifyCode, password } = req.body
  try {
    if (!email) {
      throw new Error('邮箱不能为空')
    }
    if (!verifyCode) {
      throw new Error('验证码不能为空')
    }
    if (!password) {
      throw new Error('密码不能为空')
    }
    const { results: matchResults }: any = await mailVerifyCodeModel.get({
      email,
      verify_code: verifyCode
    })
    if (!matchResults.length) {
      throw new Error('邮箱验证失败')
    }
    const user = await userService.getUserByEmail(email)
    if (user) {
      throw new Error('邮箱已被注册')
    }
    // 添加新用户
    await userService.addUser({
      email,
      password
    })
    login(req, res)
  } catch ({ message }) {
    res.send({
      message,
      status: 'error'
    })
  }
}

/**
 * 验证码
 * @param req
 * @param res
 * email 邮箱
 */
export async function mailVerifyCode(req: any, res: any) {
  const { email } = req.body
  const verifyCode: string = randomCharacter(8)
  try {
    if (!email) {
      throw new Error('邮箱不能为空')
    }
    await mailVerifyCodeModel.post({
      email,
      verify_code: verifyCode
    })
    await sendMail({
      to: email,
      subject: '注册验证码',
      text: `验证码：${verifyCode}`
    })
    res.send({
      status: 'success',
      message: '验证码发送成功，去邮箱查收吧!'
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}
