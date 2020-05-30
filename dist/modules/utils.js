"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCharacter = exports.timeFormat = exports.copyValueFromObj = exports.objectToKeyValue = void 0;
var moment_1 = __importDefault(require("moment"));
var mysql_1 = __importDefault(require("mysql"));
/**
 * 将一个对象转化成key=value形式，并且通过seperator分隔,value使用mysql.excape转义
 * @param obj
 * @param seperator
 */
function objectToKeyValue(obj, seperator) {
    if (seperator === void 0) { seperator = '&'; }
    var keys = Object.keys(obj);
    return keys.map(function (key) { return key + "=" + mysql_1.default.escape(obj[key]); }).join(seperator);
}
exports.objectToKeyValue = objectToKeyValue;
/**
 * 通过指定键名，从目标对象上复制对应键值
 * @param keys 键名数组
 * @param obj 要复制对象
 */
function copyValueFromObj(keys, obj) {
    var newObj = {};
    keys.forEach(function (key) {
        if (key in obj && obj[key] !== null && obj[key] !== undefined) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}
exports.copyValueFromObj = copyValueFromObj;
function timeFormat(time) {
    return moment_1.default(time).format('YYYY/MM/DD HH:mm:ss');
}
exports.timeFormat = timeFormat;
/**
 * 返回随机字符
 * @param length 字符长度
 */
function randomCharacter(length) {
    var list = '0123456789abcdefghijklmnopqrstuvwxyz';
    var str = '';
    while (length > 0) {
        var randomIndex = Math.floor(Math.random() * 35);
        str += list[randomIndex];
        length--;
    }
    return str;
}
exports.randomCharacter = randomCharacter;
