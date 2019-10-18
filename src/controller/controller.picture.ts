import pictureModel from '../model/model.userPicture'

export async function save(req: any, res: any) {
  try {
    const { uid } = req.auth
    const { directory, filename } = req.body
    if (!directory) {
      throw new Error('directory不能为空')
    }
    if (!filename) {
      throw new Error('filename不能为空')
    }
    await pictureModel.post({
      directory,
      filename,
      uid
    })
    res.send({
      status: 'success',
      message: '保存成功'
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}