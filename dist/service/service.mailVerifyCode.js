"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var entity_mailVerifyCode_1 = __importDefault(require("../entity/entity.mailVerifyCode"));
function getCodes() {
    var repository = typeorm_1.getRepository(entity_mailVerifyCode_1.default);
    return repository.find();
}
exports.getCodes = getCodes;
function addOne(params) {
    var email = params.email, code = params.code;
    var repository = typeorm_1.getRepository(entity_mailVerifyCode_1.default);
    var mailCode = new entity_mailVerifyCode_1.default();
    mailCode.email = email;
    mailCode.code = code;
    return repository.save(mailCode);
}
exports.addOne = addOne;
