"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * 发送邮件
 * @param message.to 要发送的邮箱
 * @param message.subject 邮件主题
 * @param message.html html形式的邮件内容
 * @param message.text 文本形式的邮件内容
 */
function default_1(message) {
    var transporter = nodemailer_1.default.createTransport({
        host: 'hwhzsmtp.qiye.163.com',
        port: 994,
        secure: true,
        auth: {
            user: 'chenzr@chd.edu.cn',
            pass: 'dangerous437'
        }
    });
    return transporter.sendMail({
        from: 'chenzr@chd.edu.cn',
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html
    });
}
exports.default = default_1;
