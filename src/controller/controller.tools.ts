import STS from 'qcloud-cos-sts';
import * as config from '../config/index';
import * as userService from '../service/service.user';

/**
 * 获取腾讯云对象存储上传令牌
 * @param req
 * @param res
 */
export async function getUploadToken(req: any, res: any) {
  try {
    const { uid } = req.auth;
    const { type } = req.query;
    let directory: string | undefined;
    let bucket = config.COS_BUCKET;
    let region = config.COS_REGION;
    let domain = config.COS_DOMAIN;
    if (type === 'user') {
      bucket = config.COS_BUCKET_USER;
      region = config.COS_REGION_USER;
      domain = config.COS_DOMAIN_USER;
      const user = await userService.getUserById(uid);
      if (!user) {
        throw new Error('用户不存在');
      }
      directory = user.email;
    }
    STS.getCredential(
      {
        secretId: config.COS_SECRET_ID,
        secretKey: config.COS_SECRET_KEY,
        policy: STS.getPolicy([
          {
            action: 'name/cos:PutObject',
            bucket,
            region,
            prefix: directory ? `${directory}/*` : '*',
          },
        ]),
      },
      (err: Error, credential: any) => {
        if (err) throw err;
        res.send({
          status: 'success',
          data: {
            ...credential,
            bucket,
            region,
            directory,
            domain,
          },
        });
      }
    );
  } catch ({ message }) {
    res.send({
      status: 'error',
      message,
    });
  }
}
