"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var model_article_1 = __importDefault(require("../model/model.article"));
var config_1 = __importDefault(require("../config"));
var utils_1 = require("../modules/utils");
/**
 * 获取用户的文章
 * @param req
 * @param res
 */
function get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uid = req.session[config_1.default.SESSION_NAME];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_article_1.default.get({ uid: uid })];
                case 2:
                    results = (_a.sent()).results;
                    res.send({
                        status: 'success',
                        data: results
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
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
/**
 * 获取文章详情
 * @param req
 * @param res
 */
function detail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, uid, article, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    uid = req.session[config_1.default.SESSION_NAME];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_article_1.default.get({ id: id, uid: uid })];
                case 2:
                    article = (_a.sent()).results[0];
                    if (article) {
                        res.send(__assign({ status: 'success' }, article));
                    }
                    else {
                        res.send({
                            status: 'error',
                            message: '文章不存在'
                        });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.send({
                        status: 'error',
                        error: error_2
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.detail = detail;
/**
 * 新建文章
 * @param req
 * @param res
 */
function post(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, _a, _b, title, markdown, html, results, id, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    uid = req.session[config_1.default.SESSION_NAME];
                    _a = req.body, _b = _a.title, title = _b === void 0 ? '' : _b, markdown = _a.markdown, html = _a.html;
                    if (title === '') {
                        return [2 /*return*/, res.send({
                                message: '标题不能为空',
                                status: 'error'
                            })];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_article_1.default.post({ uid: uid, title: title, markdown: markdown, html: html })];
                case 2:
                    results = (_c.sent()).results;
                    id = results.insertId;
                    req.params.id = id;
                    detail(req, res);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _c.sent();
                    res.send({
                        error: error_3,
                        status: 'error'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.post = post;
/**
 * 编辑文章
 * @param req request
 * @param res response
 */
function put(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, data, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    data = utils_1.copyValueFromObj(['title', 'markdown', 'html'], req.body);
                    if (typeof data.title !== undefined && data.title === '') {
                        return [2 /*return*/, res.send({
                                status: 'error',
                                message: 'title不能为空'
                            })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_article_1.default.put(data, { id: id })];
                case 2:
                    _a.sent();
                    req.params.id = id;
                    detail(req, res);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    res.send({
                        error: error_4,
                        status: 'error'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.put = put;
