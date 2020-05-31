"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDraftById = exports.getDraftsByUid = exports.getDraftById = exports.updateDraft = exports.createDraft = void 0;
var entity_draft_1 = __importDefault(require("../entity/entity.draft"));
var typeorm_1 = require("typeorm");
/**
 * 创建一篇草稿
 * @param params
 */
function createDraft(params) {
    var repository = typeorm_1.getRepository(entity_draft_1.default);
    var draft = new entity_draft_1.default();
    var uid = params.uid, html = params.html, raw = params.raw, title = params.title;
    draft.uid = uid;
    draft.html = html;
    draft.raw = raw;
    draft.title = title;
    return repository.save(draft);
}
exports.createDraft = createDraft;
/**
 * 更新草稿
 * @param params
 */
function updateDraft(params) {
    var uid = params.uid, id = params.id, html = params.html, title = params.title, raw = params.raw;
    var repository = typeorm_1.getRepository(entity_draft_1.default);
    return repository.update({
        uid: uid,
        id: id
    }, {
        title: title,
        html: html,
        raw: raw
    });
}
exports.updateDraft = updateDraft;
/**
 * 根据id获取草稿
 * @param id
 * @param uid
 */
function getDraftById(id, uid) {
    var repository = typeorm_1.getRepository(entity_draft_1.default);
    return repository.findOne({ id: id, uid: uid });
}
exports.getDraftById = getDraftById;
/**
 * 获取用户的草稿列表
 * @param uid
 */
function getDraftsByUid(uid) {
    var repository = typeorm_1.getRepository(entity_draft_1.default);
    return repository.find({
        uid: uid
    });
}
exports.getDraftsByUid = getDraftsByUid;
/**
 * 根据id删除草稿
 * @param id
 */
function deleteDraftById(id) {
    var repository = typeorm_1.getRepository(entity_draft_1.default);
    return repository.delete(id);
}
exports.deleteDraftById = deleteDraftById;
