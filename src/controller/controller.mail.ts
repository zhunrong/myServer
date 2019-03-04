import mailer from '../modules/mailer'

/**
 * 发送邮件
 * @param req
 * @param res
 */
export async function sendMail(req: any, res: any): Promise<void> {
  try {
    const info = await mailer({
      to: '592421472@qq.com',
      subject: '注册验证码',
      html:'<p>验证码：<em>8888</em></p>'
    })
    res.send({
      status: 'success',
      info
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}
