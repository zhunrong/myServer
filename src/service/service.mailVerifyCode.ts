import { getRepository } from 'typeorm'
import MailVerifyCode from '../entity/entity.mailVerifyCode'

export function getCodes() {
  const repository = getRepository(MailVerifyCode)
  return repository.find()
}

export interface IAddOne {
  email: string
  code: string
}
export function addOne(params: IAddOne) {
  const { email, code } = params
  const repository = getRepository(MailVerifyCode)
  const mailCode = new MailVerifyCode()
  mailCode.email = email
  mailCode.code = code
  return repository.save(mailCode)
}