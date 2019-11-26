"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __importDefault(require("../model"));
var config_1 = __importDefault(require("../../config"));
var utils_1 = require("../../modules/utils");
var RechargeRecord = /** @class */ (function (_super) {
    __extends(RechargeRecord, _super);
    function RechargeRecord(options) {
        return _super.call(this, options) || this;
    }
    /**
     * 查询数据
     * @param options 查询条件
     * @param count 每页的数量
     * @param page 查询页数
     */
    RechargeRecord.prototype.get = function (options, count, page) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, condition, _a, results, connection, fields, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        table = this.table;
                        sql = "select id,barId,amount,url,type,DATE_FORMAT(time,'%Y-%m-%d %h:%i:%s') as time from " + table;
                        if (typeof options === 'object') {
                            condition = utils_1.objectToKeyValue(options, ' and ');
                            if (condition) {
                                sql += " where " + condition;
                            }
                        }
                        if (typeof count === 'number') {
                            sql += " limit " + count;
                            if (typeof page === 'number') {
                                sql += " offset " + count * (page - 1);
                            }
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(sql)];
                    case 2:
                        _a = _b.sent(), results = _a.results, connection = _a.connection, fields = _a.fields;
                        resolve({ results: results, fields: fields });
                        connection.end();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        reject(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 获取id大于指定值的数据
     * @param id
     * @param count
     */
    RechargeRecord.prototype.getItemsMoreThanId = function (id, count) {
        if (count === void 0) { count = 100; }
        var sql = "select * from " + this.table + " where id>=" + id + " limit " + count;
        return this.query(sql);
    };
    /**
     * 读取数据
     * @param offset 偏移量
     * @param limit 最大数目
     */
    RechargeRecord.prototype.getItems = function (offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 100; }
        var sql = "select * from " + this.table + " limit " + limit + " offset " + offset;
        return this.query(sql);
    };
    /**
     * 根据日期查询
     * @param date 日期字符串 2018-10-10
     */
    RechargeRecord.prototype.getItemsByDate = function (date) {
        var sql = "select * from " + this.table + " where DATE_FORMAT(time,'%Y-%m-%d')='" + date + "'";
        return this.query(sql);
    };
    /**
     * 根据日期区间查询
     * @param start 开始日期
     * @param end 结束日期
     */
    RechargeRecord.prototype.getItemsBetweenDate = function (start, end, type) {
        if (type === void 0) { type = 'day'; }
        var sql = '';
        switch (type) {
            case 'day':
                sql = "select id,barId,amount,url,type,DATE_FORMAT(time,'%Y-%m-%d') as time from " + this.table + " where DATE_FORMAT(time,'%Y-%m-%d') BETWEEN '" + start + "' AND '" + end + "'";
                break;
        }
        return this.query(sql);
    };
    return RechargeRecord;
}(model_1.default));
exports.default = new RechargeRecord({
    host: config_1.default.DATABASE_HOST,
    user: config_1.default.USER,
    password: config_1.default.PASSWORD,
    database: 'yeba',
    table: 'recharge'
});
