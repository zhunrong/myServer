"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
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
exports.COS_SECRET_ID = process.env.COS_SECRET_ID || '';
// 腾讯云对象存储SecretKey
exports.COS_SECRET_KEY = process.env.COS_SECRET_KEY || '';
// 腾讯云对象存储bucket
exports.COS_BUCKET = process.env.COS_BUCKET || '';
// 腾讯云对象存储region
exports.COS_REGION = process.env.COS_REGION || '';
// 腾讯云对象存储访问域名
exports.COS_DOMAIN = process.env.COS_DOMAIN || '';
// 腾讯云对象存储bucket(用户)
exports.COS_BUCKET_USER = process.env.COS_BUCKET_USER || '';
// 腾讯云对象存储region(用户)
exports.COS_REGION_USER = process.env.COS_REGION_USER || '';
// 腾讯云对象存储访问域名(用户)
exports.COS_DOMAIN_USER = process.env.COS_DOMAIN_USER || '';
exports.default = {
    SESSION_DATABASE: process.env.SESSION_DATABASE || '',
    SESSION_NAME: process.env.SESSION_NAME || '',
    TOKEN_SECRET: process.env.TOKEN_SECRET || '',
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
