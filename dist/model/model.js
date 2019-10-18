"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var mysql_1 = __importDefault(require("mysql"));
var utils_1 = require("../modules/utils");
var Model = /** @class */ (function () {
    function Model(_a) {
        var host = _a.host, user = _a.user, password = _a.password, database = _a.database, table = _a.table;
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.table = table;
        this.init();
    }
    Model.prototype.connect = function (useDataBase) {
        if (useDataBase === void 0) { useDataBase = true; }
        return mysql_1.default.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: useDataBase ? this.database : undefined,
            multipleStatements: true
        });
    };
    /**
     * 查询数据
     * @param options 查询条件
     * @param count 每页的数量
     * @param page 查询页数
     */
    Model.prototype.get = function (options, count, page) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, condition, _a, results, connection, fields, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        table = this.table;
                        sql = "select * from " + table;
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
     * 插入数据
     * @param options
     */
    Model.prototype.post = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var table, keys, values, sql, _a, results, connection, fields;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof options === 'object')) return [3 /*break*/, 2];
                        table = this.table;
                        keys = Object.keys(options);
                        values = keys.map(function (key) { return "'" + options[key] + "'"; });
                        sql = "insert into " + table + " \n                     (" + keys.join(',') + ")\n                     values\n                     (" + values.join(',') + ")";
                        return [4 /*yield*/, this.query(sql)];
                    case 1:
                        _a = _b.sent(), results = _a.results, connection = _a.connection, fields = _a.fields;
                        resolve({ results: results, fields: fields });
                        connection.end();
                        return [3 /*break*/, 3];
                    case 2:
                        reject('typeof options !== object');
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 更新数据
     * @param updateData 要更新的字段对象
     * @param condition 条件
     */
    Model.prototype.put = function (updateData, condition) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var table, updateString, sql, conditionString, _a, results, connection, fields, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        table = this.table;
                        updateString = utils_1.objectToKeyValue(updateData, ',');
                        sql = "update " + table + " set " + updateString;
                        if (typeof condition === 'object') {
                            conditionString = utils_1.objectToKeyValue(condition, ' and ');
                            if (conditionString) {
                                sql += " where " + conditionString;
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
                        e_2 = _b.sent();
                        reject(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 删除数据
     * @param condition 条件
     */
    Model.prototype.delete = function (condition) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, conditionString, _a, results, connection, fields, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        table = this.table;
                        sql = "delete from " + table;
                        if (typeof condition === 'object') {
                            conditionString = utils_1.objectToKeyValue(condition, ' and ');
                            if (conditionString) {
                                sql += " where " + conditionString;
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
                        e_3 = _b.sent();
                        reject(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 根据字段名查询数量
     * @param columnName 字段名
     */
    Model.prototype.count = function (columnName) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var table, sql, _a, results, connection, fields, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        table = this.table;
                        sql = "select count(" + columnName + ") from " + table;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.query(sql)];
                    case 2:
                        _a = _b.sent(), results = _a.results, connection = _a.connection, fields = _a.fields;
                        resolve({ results: results, fields: fields, count: results[0]["count(" + columnName + ")"] });
                        connection.end();
                        return [3 /*break*/, 4];
                    case 3:
                        e_4 = _b.sent();
                        reject(e_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 执行sql
     * @param sql
     */
    Model.prototype.query = function (sql, useDataBase) {
        if (useDataBase === void 0) { useDataBase = true; }
        var connection = this.connect(useDataBase);
        return new Promise(function (resolve, reject) {
            connection.query(sql, function (error, results, fields) {
                if (error) {
                    return reject(error);
                }
                resolve({
                    results: results,
                    fields: fields,
                    connection: connection
                });
            });
        });
    };
    /**
     * 初始化
     */
    Model.prototype.init = function () { };
    return Model;
}());
exports.default = Model;
