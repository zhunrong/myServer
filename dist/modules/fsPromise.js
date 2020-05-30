"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkPromise = exports.rmdirPromise = exports.renamePromise = exports.mkDirPromise = exports.readDirPromise = exports.statPromise = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function statPromise(filePath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.stat(filePath, function (error, stats) {
            if (error)
                return reject(error);
            var file = {
                isDirectory: stats.isDirectory(),
                size: stats.size,
                createAt: new Date(stats.birthtime),
                lastModifyAt: new Date(stats.mtime)
            };
            resolve(file);
        });
    });
}
exports.statPromise = statPromise;
function readDirPromise(rootDir, relPath) {
    var dirPath = path_1.default.resolve(rootDir, relPath);
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(dirPath, function (error, files) {
            if (error)
                return reject(error);
            var promiseArr = [];
            files.forEach(function (filename) {
                promiseArr.push(new Promise(function (resolve, reject) {
                    statPromise(path_1.default.resolve(dirPath, filename)).then(function (file) {
                        resolve(Object.assign(file, {
                            name: filename
                        }));
                    });
                }));
            });
            Promise.all(promiseArr)
                .then(function (files) {
                // 将目录文件排在前面
                var sortedFiles = [];
                files.forEach(function (file) {
                    if (file.isDirectory) {
                        sortedFiles.unshift(file);
                    }
                    else {
                        sortedFiles.push(file);
                    }
                });
                resolve(sortedFiles);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    });
}
exports.readDirPromise = readDirPromise;
function mkDirPromise(dirPath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.mkdir(dirPath, function (error) {
            if (error)
                return reject(error);
            resolve();
        });
    });
}
exports.mkDirPromise = mkDirPromise;
function renamePromise(oldPath, newPath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.rename(oldPath, newPath, function (error) {
            if (error)
                return reject(error);
            resolve();
        });
    });
}
exports.renamePromise = renamePromise;
function rmdirPromise(dirPath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.rmdir(dirPath, function (error) {
            if (error)
                return reject(error);
            resolve();
        });
    });
}
exports.rmdirPromise = rmdirPromise;
function unlinkPromise(filePath) {
    return new Promise(function (resolve, reject) {
        fs_1.default.unlink(filePath, function (error) {
            if (error)
                return reject(error);
            resolve();
        });
    });
}
exports.unlinkPromise = unlinkPromise;
