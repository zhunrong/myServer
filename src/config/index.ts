import { pathFilter } from 'express-unless'
// 不需要权限验证的请求
export const DO_NOT_CHECK_REQUEST_PATH: pathFilter[] = [
  '/login',
  '/register',
  '/yeba/visit',
  '/yeba/rechargeOrder',
  '/mailVerifyCode',
  '/allArticle',
  {
    url: '/articleVisit',
    methods: ['POST', 'OPTIONS']
  }
]
// 腾讯云对象存储SecretId
export const COS_SECRET_ID: string = 'AKIDb7ScfYqoDTaN1TP7EAtAPSO9k9NTwFtU'
// 腾讯云对象存储SecretKey
export const COS_SECRET_KEY: string = 'f9t7B3jHyibVGuQlz2vfHk285sTs5FDz'
// 腾讯云对象存储bucket
export const COS_BUCKET: string = 'zr-1253381776'
// 腾讯云对象存储region
export const COS_REGION: string = 'ap-guangzhou'
// 腾讯云对象存储访问域名
export const COS_DOMAIN: string = 'https://zr-1253381776.cos.ap-guangzhou.myqcloud.com'
// 腾讯云对象存储bucket(用户)
export const COS_BUCKET_USER: string = 'user-1253381776'
// 腾讯云对象存储region(用户)
export const COS_REGION_USER: string = 'ap-guangzhou'
// 腾讯云对象存储访问域名(用户)
export const COS_DOMAIN_USER: string = 'https://user-1253381776.cos.ap-guangzhou.myqcloud.com'

export default {
  PORT: 80,
  DATABASE_HOST: 'localhost',
  USER: 'zr_dev',
  PASSWORD: 'YZ4371716',
  SESSION_DATABASE: 'session_db',
  SESSION_NAME: 'uid',
  TOKEN_SECRET: 'dangerous',
  TOKEN_MAX_AGE: 60 * 60 * 24, // second
  DO_NOT_CHECK_REQUEST_PATH,
  COS_SECRET_ID,
  COS_SECRET_KEY,
  COS_BUCKET,
  COS_REGION,
  COS_DOMAIN,
  COS_BUCKET_USER,
  COS_REGION_USER,
  COS_DOMAIN_USER
}
