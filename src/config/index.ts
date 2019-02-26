// 不需要权限验证的请求
const DO_NOT_CHECK_REQUEST_PATH: string[] = [
  '/login',
  '/register',
  '/yeba/visit',
  '/yeba/rechargeOrder'
]
export default {
  PORT: 80,
  DATABASE_HOST: 'localhost',
  USER: 'zr_dev',
  PASSWORD: 'YZ4371716',
  SESSION_DATABASE: 'session_db',
  SESSION_NAME: 'uid',
  TOKEN_SECRET: 'dangerous',
  TOKEN_MAX_AGE: 60 * 60 * 24, // second
  DO_NOT_CHECK_REQUEST_PATH
}
