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
var typeorm_1 = require("typeorm");
var entity_article_1 = __importDefault(require("../entity/entity.article"));
var entity_user_1 = __importDefault(require("../entity/entity.user"));
var entity_articleVisit_1 = __importDefault(require("../entity/entity.articleVisit"));
function getArticles(params) {
    if (params === void 0) { params = {}; }
    var _a = params.pageSize, pageSize = _a === void 0 ? 2 : _a, _b = params.page, page = _b === void 0 ? 1 : _b;
    var repository = typeorm_1.getRepository(entity_article_1.default);
    return repository.
        createQueryBuilder('article').
        leftJoinAndSelect(entity_user_1.default, 'user', 'article.uid = user.id').
        select('article.id', 'id').
        addSelect('article.title', 'title').
        addSelect('article.uid', 'uid').
        addSelect('DATE_FORMAT(article.update_at,"%Y-%m-%d %h:%i:%s")', 'updateTime').
        addSelect('user.avatar', 'avatar').
        offset((page - 1) * pageSize).
        limit(pageSize).
        getRawMany();
}
exports.getArticles = getArticles;
/**
 * 新增文章
 * @param params
 */
function addArticle(params) {
    var repository = typeorm_1.getRepository(entity_article_1.default);
    var article = new entity_article_1.default();
    var uid = params.uid, title = params.title, markdown = params.markdown;
    article.uid = uid;
    article.title = title;
    article.markdown = markdown;
    return repository.save(article);
}
exports.addArticle = addArticle;
/**
 * 根据id获取文章详情
 * @param id
 */
function getArticleById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var repository, article;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(entity_article_1.default);
                    return [4 /*yield*/, repository.query("\n    select uid,\n           article.id as id,\n           title,\n           markdown,\n           DATE_FORMAT(article.create_at,'%Y-%m-%d %h:%i:%s') as createTime,\n           DATE_FORMAT(article.update_at,'%Y-%m-%d %h:%i:%s') as updateTime,\n           nickname,\n           email,\n           avatar,\n           COUNT(*) as visitCount\n    from article,article_visit,user\n    where article_visit.article_id = article.id and article.id = '" + id + "' and user.id = article.uid")];
                case 1:
                    article = (_a.sent())[0];
                    return [2 /*return*/, article ? __assign({}, article, { visitCount: Number(article.visitCount) }) : null];
            }
        });
    });
}
exports.getArticleById = getArticleById;
/**
 * 根据id编辑文章
 * @param id
 * @param params
 */
function editArticle(id, params) {
    var repository = typeorm_1.getRepository(entity_article_1.default);
    return repository.update(id, params);
}
exports.editArticle = editArticle;
function addArticleVisit(params) {
    var repository = typeorm_1.getRepository(entity_articleVisit_1.default);
    var articleId = params.articleId, userId = params.userId;
    var visit = new entity_articleVisit_1.default();
    visit.articleId = articleId;
    visit.userId = userId || '';
    return repository.save(visit);
}
exports.addArticleVisit = addArticleVisit;
function query(id) {
    var repository = typeorm_1.getRepository(entity_articleVisit_1.default);
    return repository.query("\n    select uid,\n           article.id as id,\n           title,\n           markdown,\n           DATE_FORMAT(article.create_at,'%Y-%m-%d %h:%i:%s') as createTime,\n           DATE_FORMAT(article.update_at,'%Y-%m-%d %h:%i:%s') as updateTime,\n           nickname,\n           email,\n           avatar,\n           COUNT(article_visit.id) as visitCount\n    from article,article_visit,user\n    where article_visit.article_id = article.id and article.id = '" + id + "' and user.id = article.uid");
}
exports.query = query;
