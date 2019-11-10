import { getRepository } from 'typeorm'
import MailVerifyCode from '../entity/entity.mailVerifyCode'

interface IGet {
  email?: string
  code?: string
}
export function getCodes(params: IGet) {
  const repository = getRepository(MailVerifyCode)
  return repository.find(params)
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