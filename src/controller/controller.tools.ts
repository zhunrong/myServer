import STS from 'qcloud-cos-sts'
import config from '../config/index'

/**
 * 获取腾讯云对象存储上传令牌
 * @param req
 * @param res
 */
export async function getUploadToken(req: any, res: any) {
  try {
    STS.getCredential(
      {
        secretId: config.COS_SECRET_ID,
        secretKey: config.COS_SECRET_KEY,
        policy: STS.getPolicy([
          {
            action: 'name/cos:PutObject',
            bucket: config.COS_BUCKET,
            region: config.COS_REGION,
            prefix: '*'
          }
        ])
      },
      (err: Error, credential: any) => {
        if (err) throw err
        res.send({
          status: 'success',
          data: {
            ...credential,
            bucket: config.COS_BUCKET,
            region: config.COS_REGION
          }
        })
      }
    )
  } catch ({ message }) {
    res.send({
      status: 'error',
      message
    })
  }
}
