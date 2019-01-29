"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __importDefault(require("../model"));
var config_1 = __importDefault(require("../../config"));
var VisitRecord = /** @class */ (function (_super) {
    __extends(VisitRecord, _super);
    function VisitRecord(options) {
        return _super.call(this, options) || this;
    }
    /**
     * 根据日期区间查询
     * @param start 开始日期
     * @param end 结束日期
     * @param type 时间类型
     * @param env 环境
     */
    VisitRecord.prototype.getItemsBetweenDate = function (start, end, type, env) {
        if (type === void 0) { type = 'day'; }
        var timeFormat = '';
        switch (type) {
            case 'day':
                timeFormat = '%Y-%m-%d';
                break;
            case 'hour':
                timeFormat = '%Y-%m-%d %H';
                break;
            case 'minute':
                timeFormat = '%Y-%m-%d %H:%i';
                break;
            case 'second':
                timeFormat = '%Y-%m-%d %H:%i:%s';
                break;
            default:
                timeFormat = '%Y-%m-%d %H';
        }
        var sql = "select id,barId,userId,username,visitUrl,type,DATE_FORMAT(visitTime,'" + timeFormat + "') as visitTime from " + this.table + " where DATE_FORMAT(visitTime,'" + timeFormat + "') BETWEEN '" + start + "' AND '" + end + "' AND type=" + env;
        return this.query(sql);
    };
    return VisitRecord;
}(model_1.default));
exports.default = new VisitRecord({
    host: config_1.default.DATABASE_HOST,
    user: config_1.default.USER,
    password: config_1.default.PASSWORD,
    database: 'yeba',
    table: 'visit'
});
