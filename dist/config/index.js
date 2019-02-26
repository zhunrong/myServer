"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 不需要权限验证的请求
var DO_NOT_CHECK_REQUEST_PATH = [
    '/login',
    '/register',
    '/yeba/visit',
    '/yeba/rechargeOrder'
];
exports.default = {
    PORT: 80,
    DATABASE_HOST: 'localhost',
    USER: 'zr_dev',
    PASSWORD: 'YZ4371716',
    SESSION_DATABASE: 'session_db',
    SESSION_NAME: 'uid',
    TOKEN_SECRET: 'dangerous',
    TOKEN_MAX_AGE: 60 * 60 * 24,
    DO_NOT_CHECK_REQUEST_PATH: DO_NOT_CHECK_REQUEST_PATH
};
