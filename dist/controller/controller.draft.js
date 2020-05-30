"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDraft = exports.updateDraft = exports.deleteDraft = exports.createDraft = void 0;
var draftService = __importStar(require("../service/service.draft"));
/**
 * 创建草稿
 * @param req
 * @param res
 */
exports.createDraft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, _a, _b, html, _c, raw, _d, title, draft, _e, message;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 2, , 3]);
                uid = (_f = req.session) === null || _f === void 0 ? void 0 : _f.uid;
                if (!uid)
                    throw new Error('未登录');
                _a = req.body, _b = _a.html, html = _b === void 0 ? '' : _b, _c = _a.raw, raw = _c === void 0 ? '' : _c, _d = _a.title, title = _d === void 0 ? '' : _d;
                return [4 /*yield*/, draftService.createDraft({
                        title: title,
                        uid: uid,
                        html: html,
                        raw: raw
                    })];
            case 1:
                draft = _g.sent();
                res.send({
                    status: 'success',
                    data: draft,
                });
                return [3 /*break*/, 3];
            case 2:
                _e = _g.sent();
                message = _e.message;
                res.send({
                    status: 'error',
                    message: message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * 删除草稿
 * @param req
 * @param res
 */
exports.deleteDraft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, id, draft, _a, message;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                uid = (_b = req.session) === null || _b === void 0 ? void 0 : _b.uid;
                if (!uid)
                    throw new Error('未登录');
                id = req.body.id;
                if (!id)
                    throw new Error('id不能为空');
                return [4 /*yield*/, draftService.getDraftById(id, uid)];
            case 1:
                draft = _c.sent();
                if (!draft)
                    throw new Error('草稿不存在');
                return [4 /*yield*/, draftService.deleteDraftById(id)];
            case 2:
                _c.sent();
                res.send({
                    status: 'success',
                    data: draft
                });
                return [3 /*break*/, 4];
            case 3:
                _a = _c.sent();
                message = _a.message;
                res.send({
                    status: 'error',
                    message: message
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * 更新草稿
 * @param req
 * @param res
 */
exports.updateDraft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, _a, _b, id, html, raw, title, result, _c, message;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                uid = (_d = req.session) === null || _d === void 0 ? void 0 : _d.uid;
                if (!uid)
                    throw new Error('未登录');
                _a = req.body, _b = _a.id, id = _b === void 0 ? '' : _b, html = _a.html, raw = _a.raw, title = _a.title;
                return [4 /*yield*/, draftService.updateDraft({
                        uid: uid, id: id, title: title, html: html, raw: raw
                    })];
            case 1:
                result = _e.sent();
                if (!result.affected)
                    throw new Error(result.raw.message);
                res.send({
                    status: 'success',
                });
                return [3 /*break*/, 3];
            case 2:
                _c = _e.sent();
                message = _c.message;
                res.send({
                    status: 'error',
                    message: message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getDraft = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, id, draft, _a, message;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                uid = (_b = req.session) === null || _b === void 0 ? void 0 : _b.uid;
                if (!uid)
                    throw new Error('未登录');
                id = req.params.id;
                return [4 /*yield*/, draftService.getDraftById(id, uid)];
            case 1:
                draft = _c.sent();
                if (!draft)
                    throw new Error('草稿不存在');
                res.send({
                    status: 'success',
                    data: draft
                });
                return [3 /*break*/, 3];
            case 2:
                _a = _c.sent();
                message = _a.message;
                res.send({
                    status: 'error',
                    message: message
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
