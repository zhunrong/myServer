"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 将一个对象转化成key=value形式，并且通过seperator分隔
 * @param obj
 * @param seperator
 */
function objectToKeyValue(obj, seperator) {
    if (seperator === void 0) { seperator = '&'; }
    var keys = Object.keys(obj);
    return keys.map(function (key) { return key + "='" + obj[key] + "'"; }).join(seperator);
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
        if (key in obj) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}
exports.copyValueFromObj = copyValueFromObj;
