import { getRepository } from 'typeorm'
import UserPicture from '../entity/entity.userPicture'

export function getPictures() {
  const repository = getRepository(UserPicture)
  return repository.find()
}

interface ISave {
  uid: string,
  directory: string,
  filename: string
}
export function save(params: ISave) {
  const repository = getRepository(UserPicture)
  const { uid, directory, filename } = params
  const userPicture = new UserPicture()
  userPicture.uid = uid
  userPicture.directory = directory
  userPicture.filename = filename
  return repository.save(userPicture)
}

export function getPicturesByUserId(uid: string) {
  const repository = getRepository(UserPicture)
  return repository.find({
    uid
  })
}