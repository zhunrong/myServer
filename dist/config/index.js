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
    {
        url: '/articleVisit',
        methods: ['POST', 'OPTIONS']
    }
];
// 腾讯云对象存储SecretId
exports.COS_SECRET_ID = 'AKIDb7ScfYqoDTaN1TP7EAtAPSO9k9NTwFtU';
// 腾讯云对象存储SecretKey
exports.COS_SECRET_KEY = 'f9t7B3jHyibVGuQlz2vfHk285sTs5FDz';
// 腾讯云对象存储bucket
exports.COS_BUCKET = 'zr-1253381776';
// 腾讯云对象存储region
exports.COS_REGION = 'ap-guangzhou';
// 腾讯云对象存储访问域名
exports.COS_DOMAIN = 'https://zr-1253381776.cos.ap-guangzhou.myqcloud.com';
// 腾讯云对象存储bucket(用户)
exports.COS_BUCKET_USER = 'user-1253381776';
// 腾讯云对象存储region(用户)
exports.COS_REGION_USER = 'ap-guangzhou';
// 腾讯云对象存储访问域名(用户)
exports.COS_DOMAIN_USER = 'https://user-1253381776.cos.ap-guangzhou.myqcloud.com';
exports.default = {
    SESSION_DATABASE: 'session_db',
    SESSION_NAME: 'uid',
    TOKEN_SECRET: 'dangerous',
    TOKEN_MAX_AGE: 60 * 60 * 24,
    DO_NOT_CHECK_REQUEST_PATH: exports.DO_NOT_CHECK_REQUEST_PATH,
    COS_SECRET_ID: exports.COS_SECRET_ID,
    COS_SECRET_KEY: exports.COS_SECRET_KEY,
    COS_BUCKET: exports.COS_BUCKET,
    COS_REGION: exports.COS_REGION,
    COS_DOMAIN: exports.COS_DOMAIN,
    COS_BUCKET_USER: exports.COS_BUCKET_USER,
    COS_REGION_USER: exports.COS_REGION_USER,
    COS_DOMAIN_USER: exports.COS_DOMAIN_USER
};
