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
var model_rechargeRecord_1 = __importDefault(require("../../model/yeba/model.rechargeRecord"));
var utils_1 = require("../../modules/utils");
// 获取记录
function get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, condition, page, count, _a, results, total, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = req.query;
                    condition = utils_1.copyValueFromObj(['id', 'type', 'url', 'amount', 'barId'], query);
                    page = +query.page || 1;
                    count = +query.count || 10;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([
                            model_rechargeRecord_1.default.get(condition, count, page),
                            model_rechargeRecord_1.default.count('id')
                        ])
                        // results.forEach((item: any) => {
                        //   item.time = timeFormat(item.time)
                        // })
                    ];
                case 2:
                    _a = _b.sent(), results = _a[0].results, total = _a[1].count;
                    // results.forEach((item: any) => {
                    //   item.time = timeFormat(item.time)
                    // })
                    res.send({
                        status: 'success',
                        data: results,
                        meta: {
                            page: page,
                            count: count,
                            total: total
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    res.send({
                        status: 'error',
                        error: error_1
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
// 新增一条记录
function post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, data, results, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    data = utils_1.copyValueFromObj(['barId', 'amount', 'url', 'type'], body);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_rechargeRecord_1.default.post(data)];
                case 2:
                    results = (_a.sent()).results;
                    res.send({
                        status: 'success',
                        results: results
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.send({
                        error: error_2,
                        status: 'error'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.post = post;
// 统计数据
function statistic(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, timeType, start, end, _c, category, pattern, results, error_3;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = req.body, _b = _a.timeType, timeType = _b === void 0 ? 'day' : _b, start = _a.start, end = _a.end, _c = _a.category, category = _c === void 0 ? 'time' : _c;
                    switch (timeType) {
                        case 'day':
                            pattern = /\d{4}-\d{2}-\d{2}/;
                            if (!pattern.test(start)) {
                                return [2 /*return*/, res.send({
                                        status: 'error',
                                        message: '{start}不能为非法值'
                                    })];
                            }
                            if (!pattern.test(end)) {
                                return [2 /*return*/, res.send({
                                        status: 'error',
                                        message: '{end}不能为非法值'
                                    })];
                            }
                            break;
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_rechargeRecord_1.default.getItemsBetweenDate(start, end, timeType)];
                case 2:
                    results = (_d.sent()).results;
                    res.send({
                        status: 'success',
                        data: statisticFunction[category](results)
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _d.sent();
                    res.send({
                        status: 'error',
                        error: error_3
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.statistic = statistic;
// 统计函数集合
var statisticFunction = {
    time: function (results) {
        var statisticObject = {};
        results.forEach(function (item) {
            if (!statisticObject[item.time]) {
                statisticObject[item.time] = {
                    amount: 0,
                    time: item.time,
                    count: 0
                };
            }
            statisticObject[item.time].amount += item.amount;
            statisticObject[item.time].count++;
        });
        var statisticArray = [];
        for (var key in statisticObject) {
            var item = statisticObject[key];
            item.amount = Math.round(item.amount);
            statisticArray.push(item);
        }
        return statisticArray;
    },
    bar: function (results) {
        var statisticObject = {};
        results.forEach(function (item) {
            if (!statisticObject[item.barId]) {
                statisticObject[item.barId] = {
                    amount: 0,
                    barId: item.barId,
                    count: 0
                };
            }
            statisticObject[item.barId].amount += item.amount;
            statisticObject[item.barId].count++;
        });
        var statisticArray = [];
        for (var key in statisticObject) {
            var item = statisticObject[key];
            item.amount = Math.round(item.amount);
            statisticArray.push(item);
        }
        return statisticArray;
    }
};
