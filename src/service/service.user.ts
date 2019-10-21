import { getRepository } from 'typeorm'
import { User } from '../entity/entity.user'

export async function getUsers() {
  const repository = getRepository(User)
  const list = await repository.find()
  console.log(list)
}

/**
 * 获取用户信息
 * @param id string
 */
export function getUserInfo(id: string) {
  const repository = getRepository(User)
  return repository.findOne(id)
}

export interface IUserInfo {
  nickname?: string
  avatar?: string
}

/**
 * 更新用户信息
 * @param id 
 * @param info 
 */
export function updateUserInfo(id: string, info: IUserInfo) {
  const repository = getRepository(User)
  return repository.update(id, info)
}