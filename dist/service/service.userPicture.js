"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var entity_userPicture_1 = __importDefault(require("../entity/entity.userPicture"));
function getPictures() {
    var repository = typeorm_1.getRepository(entity_userPicture_1.default);
    return repository.find();
}
exports.getPictures = getPictures;
function save(params) {
    var repository = typeorm_1.getRepository(entity_userPicture_1.default);
    var uid = params.uid, directory = params.directory, filename = params.filename;
    var userPicture = new entity_userPicture_1.default();
    userPicture.uid = uid;
    userPicture.directory = directory;
    userPicture.filename = filename;
    return repository.save(userPicture);
}
exports.save = save;
function getPicturesByUserId(uid) {
    var repository = typeorm_1.getRepository(entity_userPicture_1.default);
    return repository.find({
        uid: uid
    });
}
exports.getPicturesByUserId = getPicturesByUserId;
