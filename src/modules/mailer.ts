import nodeMailer from 'nodemailer';

interface IMessage {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}
/**
 * 发送邮件
 * @param message.to 要发送的邮箱
 * @param message.subject 邮件主题
 * @param message.html html形式的邮件内容
 * @param message.text 文本形式的邮件内容
 */
export default function (message: IMessage): Promise<any> {
  const transporter = nodeMailer.createTransport({
    host: 'hwhzsmtp.qiye.163.com',
    port: 994,
    secure: true,
    auth: {
      user: 'chenzr@chd.edu.cn',
      pass: 'dangerous437',
    },
  });
  return transporter.sendMail({
    from: 'chenzr@chd.edu.cn',
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
}
