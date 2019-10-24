"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var entity_article_1 = __importDefault(require("../entity/entity.article"));
var entity_articleVisit_1 = __importDefault(require("../entity/entity.articleVisit"));
function getArticles(params) {
    var repository = typeorm_1.getRepository(entity_article_1.default);
    return repository.find(params);
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
    var repository = typeorm_1.getRepository(entity_article_1.default);
    return repository.findOne(id);
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
