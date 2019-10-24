import pictureModel from '../model/model.userPicture'
import config from '../config/index'
import * as userPictureService from '../service/service.userPicture'

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
    await userPictureService.save({
      uid,
      directory,
      filename
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

export async function getPictures(req: any, res: any) {
  try {
    const { uid } = req.auth
    const { results } = await pictureModel.get({
      uid
    })
    res.send({
      status: 'success',
      data: results.map((item: any) => {
        return {
          ...item,
          url: `${config.COS_DOMAIN_USER}/${item.directory}/${item.filename}`
        }
      })
    })
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}