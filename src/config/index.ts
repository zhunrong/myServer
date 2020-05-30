import { pathFilter } from 'express-unless'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({
  path: path.resolve(__dirname, '../../.env')
})

/**
 * 不需要权限验证的请求
 */
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

/**
 * 腾讯云对象存储SecretId
 */
export const COS_SECRET_ID = process.env.COS_SECRET_ID || ''
/**
 * 腾讯云对象存储SecretKey
 */
export const COS_SECRET_KEY = process.env.COS_SECRET_KEY || ''
/**
 * 腾讯云对象存储bucket
 */
export const COS_BUCKET = process.env.COS_BUCKET || ''
/**
 * 腾讯云对象存储region
 */
export const COS_REGION = process.env.COS_REGION || ''
/**
 * 腾讯云对象存储访问域名
 */
export const COS_DOMAIN = process.env.COS_DOMAIN || ''
/**
 * 腾讯云对象存储bucket(用户)
 */
export const COS_BUCKET_USER = process.env.COS_BUCKET_USER || ''
/**
 * 腾讯云对象存储region(用户)
 */
export const COS_REGION_USER = process.env.COS_REGION_USER || ''
/**
 * 腾讯云对象存储访问域名(用户)
 */
export const COS_DOMAIN_USER = process.env.COS_DOMAIN_USER || ''
/**
 * cookie secret
 */
export const COOKIE_SECRET = process.env.COOKIE_SECRET || ''
/**
 * cookie有效期 12h
 */
export const COOKIE_MAX_AGE = 12 * 60 * 60 * 1000
