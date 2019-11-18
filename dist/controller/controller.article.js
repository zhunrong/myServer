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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../modules/utils");
var articleService = __importStar(require("../service/service.article"));
/**
 * 获取用户的文章
 * @param req
 * @param res
 */
function get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, articles, _a, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    uid = req.auth.uid;
                    return [4 /*yield*/, articleService.getArticles({ uid: uid })];
                case 1:
                    articles = _b.sent();
                    res.send({
                        status: 'success',
                        data: articles
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
        var page, pageSize, articles, total, _a, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    page = parseInt(req.query.page);
                    pageSize = parseInt(req.query.pageSize);
                    return [4 /*yield*/, articleService.getArticles({
                            pageSize: pageSize,
                            page: page
                        })];
                case 1:
                    articles = _b.sent();
                    return [4 /*yield*/, articleService.getArticleCount()];
                case 2:
                    total = _b.sent();
                    res.send({
                        status: 'success',
                        data: articles,
                        meta: {
                            pageSize: pageSize,
                            page: page,
                            pageCount: Math.ceil(total / pageSize)
                        }
                    });
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
                    return [4 /*yield*/, articleService.getArticleById(id)];
                case 2:
                    article = _b.sent();
                    if (!article) {
                        throw new Error('文章不存在');
                    }
                    res.send({
                        status: 'success',
                        data: article,
                    });
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
        var uid, _a, title, markdown, article, id, _b, message;
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
                    return [4 /*yield*/, articleService.addArticle({ uid: uid, title: title, markdown: markdown })];
                case 2:
                    article = _c.sent();
                    id = article.id;
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
                    return [4 /*yield*/, articleService.getArticleById(id)];
                case 1:
                    article = _b.sent();
                    if (!article) {
                        throw new Error('该文章不存在');
                    }
                    if (article.uid !== uid) {
                        throw new Error('该文章不属于当前用户');
                    }
                    return [4 /*yield*/, articleService.editArticle(id, data)];
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
/**
 * 增加一条文章访问记录
 * @param req
 * @param res
 */
function addVisitRecord(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, articleId, userId, _b, message;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = req.body, articleId = _a.articleId, userId = _a.userId;
                    return [4 /*yield*/, articleService.addArticleVisit({
                            articleId: articleId,
                            userId: userId
                        })];
                case 1:
                    _c.sent();
                    res.send({
                        status: 'success'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    _b = _c.sent();
                    message = _b.message;
                    res.send({
                        message: message,
                        status: 'error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addVisitRecord = addVisitRecord;
