"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 不需要权限验证的请求
exports.DO_NOT_CHECK_REQUEST_PATH = [
    '/login',
    '/register',
    '/yeba/visit',
    '/yeba/rechargeOrder',
    '/mailVerifyCode',
    '/allArticle',
    /^\/article\/\d+$/
];
// 腾讯云对象存储SecretId
exports.COS_SECRET_ID = 'AKIDb7ScfYqoDTaN1TP7EAtAPSO9k9NTwFtU';
// 腾讯云对象存储SecretKey
exports.COS_SECRET_KEY = 'f9t7B3jHyibVGuQlz2vfHk285sTs5FDz';
// 腾讯云对象存储bucket
exports.COS_BUCKET = 'zr-1253381776';
// 腾讯云对象存储region
exports.COS_REGION = 'ap-guangzhou';
exports.default = {
    PORT: 80,
    DATABASE_HOST: 'localhost',
    USER: 'zr_dev',
    PASSWORD: 'YZ4371716',
    SESSION_DATABASE: 'session_db',
    SESSION_NAME: 'uid',
    TOKEN_SECRET: 'dangerous',
    TOKEN_MAX_AGE: 60 * 60 * 24,
    DO_NOT_CHECK_REQUEST_PATH: exports.DO_NOT_CHECK_REQUEST_PATH,
    COS_SECRET_ID: exports.COS_SECRET_ID,
    COS_SECRET_KEY: exports.COS_SECRET_KEY,
    COS_BUCKET: exports.COS_BUCKET,
    COS_REGION: exports.COS_REGION
};
