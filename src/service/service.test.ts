import { getRepository } from 'typeorm'
import { Test } from '../entity/entity.test'

export async function get() {
  const repository = getRepository(Test)
  const list = await repository.find()
  console.log(list)
}

export interface IPost {
  name: string
}
/**
 * test 插入数据
 * @param params.name string
 */
export async function post(params: IPost) {
  const repository = getRepository(Test)
  const test = new Test()
  test.name = params.name
  await repository.save(test)
}