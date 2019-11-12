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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var entity_user_1 = require("../entity/entity.user");
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var repository, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = typeorm_1.getRepository(entity_user_1.User);
                    return [4 /*yield*/, repository.find()];
                case 1:
                    list = _a.sent();
                    console.log(list);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUsers = getUsers;
/**
 * 根据id获取用户
 * @param id string
 */
function getUserById(id) {
    var repository = typeorm_1.getRepository(entity_user_1.User);
    return repository.findOne(id);
}
exports.getUserById = getUserById;
/**
 * 根据email获取用户
 * @param email string
 */
function getUserByEmail(email) {
    var repository = typeorm_1.getRepository(entity_user_1.User);
    return repository.findOne({ email: email });
}
exports.getUserByEmail = getUserByEmail;
/**
 * 更新用户信息
 * @param id
 * @param info
 */
function updateUserInfo(id, info) {
    var repository = typeorm_1.getRepository(entity_user_1.User);
    return repository.update(id, info);
}
exports.updateUserInfo = updateUserInfo;
/**
 * 新增用户
 * @param info
 */
function addUser(info) {
    var nickname = info.nickname, avatar = info.avatar, password = info.password, email = info.email;
    var repository = typeorm_1.getRepository(entity_user_1.User);
    var user = new entity_user_1.User();
    user.email = email;
    user.password = password;
    user.avatar = avatar || '';
    user.nickname = nickname || email;
    return repository.save(user);
}
exports.addUser = addUser;