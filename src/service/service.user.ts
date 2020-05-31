import { getRepository } from 'typeorm';
import { User } from '../entity/entity.user';

export async function getUsers() {
  const repository = getRepository(User);
  const list = await repository.find();
  console.log(list);
}

/**
 * 根据id获取用户
 * @param id string
 */
export function getUserById(id: string) {
  const repository = getRepository(User);
  return repository.findOne(id);
}

/**
 * 根据email获取用户
 * @param email string
 */
export function getUserByEmail(email: string) {
  const repository = getRepository(User);
  return repository.findOne({ email });
}

export interface IUserInfo {
  nickname?: string;
  avatar?: string;
  password?: string;
  email?: string;
}

/**
 * 更新用户信息
 * @param id
 * @param info
 */
export function updateUserInfo(id: string, info: IUserInfo) {
  const repository = getRepository(User);
  return repository.update(id, info);
}

export interface IUserInfo2 extends IUserInfo {
  password: string;
  email: string;
}

/**
 * 新增用户
 * @param info
 */
export function addUser(info: IUserInfo2) {
  const { nickname, avatar, password, email } = info;
  const repository = getRepository(User);
  const user = new User();
  user.email = email;
  user.password = password;
  user.avatar = avatar || '';
  user.nickname = nickname || email;
  return repository.save(user);
}
