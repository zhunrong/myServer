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
var model_article_1 = __importDefault(require("../model/model.article"));
var utils_1 = require("../modules/utils");
/**
 * 获取用户的文章
 * @param req
 * @param res
 */
function get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, results, _a, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    uid = req.auth.uid;
                    return [4 /*yield*/, model_article_1.default.getArticles(uid)];
                case 1:
                    results = (_b.sent()).results;
                    res.send({
                        status: 'success',
                        data: results
                    });
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    message = _a.message;
                    res.send({
                        status: 'error',
                        message: message
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
/**
 * 获取所有文章
 * @param req
 * @param res
 */
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, page, pageSize, results, _b, message;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = req.query, page = _a.page, pageSize = _a.pageSize;
                    return [4 /*yield*/, model_article_1.default.getArticles(undefined, Number(page), Number(pageSize))];
                case 1:
                    results = (_c.sent()).results;
                    res.send({
                        status: 'success',
                        data: results[0],
                        meta: results[1][0]
                    });
                    return [3 /*break*/, 3];
                case 2:
                    _b = _c.sent();
                    message = _b.message;
                    res.send({
                        status: 'error',
                        message: message
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAll = getAll;
/**
 * 获取文章详情
 * @param req
 * @param res
 */
function detail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, article, _a, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, model_article_1.default.getArticleDetail(Number(id))];
                case 2:
                    article = (_b.sent()).results[0];
                    if (article) {
                        res.send({
                            status: 'success',
                            data: article
                        });
                    }
                    else {
                        throw new Error('文章不存在');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    message = _a.message;
                    res.send({
                        status: 'error',
                        message: message
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
        var uid, _a, title, markdown, results, id, _b, message;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    uid = req.auth.uid;
                    _a = req.body, title = _a.title, markdown = _a.markdown;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    if (!title) {
                        throw new Error('标题不能为空');
                    }
                    if (!markdown) {
                        throw new Error('内容不能为空');
                    }
                    return [4 /*yield*/, model_article_1.default.post({ uid: uid, title: title, markdown: markdown })];
                case 2:
                    results = (_c.sent()).results;
                    id = results.insertId;
                    req.params.id = id;
                    detail(req, res);
                    return [3 /*break*/, 4];
                case 3:
                    _b = _c.sent();
                    message = _b.message;
                    res.send({
                        message: message,
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
        var id, uid, data, article, _a, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    uid = req.auth.uid;
                    data = utils_1.copyValueFromObj(['title', 'markdown'], req.body);
                    if (typeof data.title !== undefined && data.title === '') {
                        throw new Error('title不能为空');
                    }
                    return [4 /*yield*/, model_article_1.default.get({ id: id })];
                case 1:
                    article = (_b.sent()).results[0];
                    if (!article) {
                        throw new Error('该文章不存在');
                    }
                    if (article.uid !== uid) {
                        throw new Error('该文章不属于当前用户');
                    }
                    return [4 /*yield*/, model_article_1.default.put(data, { id: id })];
                case 2:
                    _b.sent();
                    req.params.id = id;
                    detail(req, res);
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    message = _a.message;
                    res.send({
                        message: message,
                        status: 'error'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.put = put;
