import * as userService from '../service/service.user'
import * as mailVerifyCodeService from '../service/service.mailVerifyCode'
import sendMail from '../modules/mailer'
import { randomCharacter } from '../modules/utils'
import { RequestHandler } from 'express'

/**
 * 登录
 * @param req
 * @param res
 * email 邮箱
 * password 密码
 */
export const login: RequestHandler = async (req, res) => {
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
    if (req.session) {
      req.session.uid = user.id
    }
    res.send({
      status: 'success',
    })
  } catch ({ message }) {
    res.send({
      message,
      status: 'error'
    })
  }
}

/**
 * 注销登录
 * @param req
 * @param res
 */
export const logout: RequestHandler = async (req, res) => {
  try {
    if(req.session) {
      req.session.uid = ''
      req.sessionOptions.maxAge = -1
    }
    res.send({
      status: 'success',
      message: '注销成功'
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
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
export const register: RequestHandler = async (req, res, next) => {
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
    const codes = await mailVerifyCodeService.getCodes({
      email,
      code: verifyCode
    })
    if (!codes.length) {
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
    login(req, res, next)
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
  const verifyCode: string = randomCharacter(4)
  try {
    if (!email) {
      throw new Error('邮箱不能为空')
    }
    await mailVerifyCodeService.addOne({
      email,
      code: verifyCode
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
