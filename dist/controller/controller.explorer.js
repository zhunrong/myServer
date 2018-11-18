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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var multer_1 = __importDefault(require("multer"));
var fsPromise_1 = require("../modules/fsPromise");
var rootDirPath = path_1.default.resolve(__dirname, '../../static/private');
if (!fs_1.default.existsSync(rootDirPath)) {
    fs_1.default.mkdirSync(rootDirPath);
}
/**
 * 获取相对于/explorer/的路径
 * @param path 路径
 */
function getRelativePath(path) {
    var pattern = /^\/explorer\/([^\\:*?"><|]*)/;
    // req.path可能包含中文被编码后的字符
    var match = pattern.exec(decodeURIComponent(path));
    return match[1];
}
/**
 * 通过文件路径解析文件名
 * @param {*} path
 */
function getFileName(path) {
    path = decodeURIComponent(path);
    var pattern;
    if (/.*\/$/.test(path)) {
        pattern = /.*\/([^/]+\/)/;
    }
    else {
        pattern = /.*\/([^/]+)/;
    }
    return pattern.exec(path)[1];
}
/**
 * 获取目录/文件
 * @param req request
 * @param res response
 */
function get(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var relPath, filePath, file, rootDir, currentDir, parentDir, files, parentDirRE, error_1, svgRE, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    relPath = getRelativePath(req.path);
                    filePath = path_1.default.resolve(rootDirPath, relPath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, fsPromise_1.statPromise(filePath)];
                case 2:
                    file = _a.sent();
                    rootDir = '/';
                    currentDir = rootDir + relPath;
                    parentDir = '/';
                    if (!file.isDirectory) return [3 /*break*/, 7];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, fsPromise_1.readDirPromise(rootDirPath, relPath)
                        // 使目录路径以'/'结尾
                    ];
                case 4:
                    files = _a.sent();
                    // 使目录路径以'/'结尾
                    if (!/.*\/$/.test(currentDir)) {
                        currentDir += '/';
                    }
                    if (currentDir != '/') {
                        parentDirRE = /(.*\/)[^\/]+\//;
                        parentDir = parentDirRE.exec(currentDir)[1];
                    }
                    res.status(200).send({
                        files: files,
                        currentDir: currentDir,
                        parentDir: parentDir,
                        rootDir: rootDir,
                        filePath: filePath
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    throw error_1;
                case 6: return [3 /*break*/, 8];
                case 7:
                    svgRE = /.svg$/;
                    if (svgRE.test(filePath)) {
                        res.append('Content-Type', 'image/svg+xml');
                    }
                    // 直接返回一个文件
                    fs_1.default.createReadStream(filePath).pipe(res);
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_2 = _a.sent();
                    res.send({
                        status: 'error',
                        message: '读取错误',
                        error: error_2
                    });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
var upload = multer_1.default({
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            // 注意 req.body 可能还没有完全填充，这取决于向客户端发送字段和文件到服务器的顺序
            var relPath = getRelativePath(req.path);
            cb(null, path_1.default.resolve(rootDirPath, relPath));
        },
        filename: function (req, file, cb) {
            // 为了发挥stream的优势,这里先以原文件名写在硬盘上，然后再修改为body.filename
            cb(null, file.originalname);
        }
    })
});
/**
 * 新建目录/文件
 */
exports.post = [
    upload.single('file'),
    function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, filename, _c, isDirectory, success, relPath, filePath, error_3, error_4, message;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = req.body, _b = _a.filename, filename = _b === void 0 ? '' : _b, _c = _a.isDirectory, isDirectory = _c === void 0 ? false : _c;
                    success = function () {
                        res.send({
                            message: '创建成功',
                            status: 'success'
                        });
                    };
                    relPath = getRelativePath(req.path);
                    filePath = path_1.default.resolve(rootDirPath, relPath, filename);
                    if (!req.file) return [3 /*break*/, 7];
                    if (!filename) return [3 /*break*/, 5];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fsPromise_1.renamePromise(req.file.path, filePath)];
                case 2:
                    _d.sent();
                    success();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _d.sent();
                    res.send({
                        error: error_3,
                        status: 'error'
                    });
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    success();
                    _d.label = 6;
                case 6: return [3 /*break*/, 13];
                case 7:
                    if (!isDirectory) return [3 /*break*/, 12];
                    if (!filename) {
                        return [2 /*return*/, res.send({
                                message: '文件名不能为空',
                                status: 'error'
                            })];
                    }
                    _d.label = 8;
                case 8:
                    _d.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, fsPromise_1.mkDirPromise(filePath)];
                case 9:
                    _d.sent();
                    success();
                    return [3 /*break*/, 11];
                case 10:
                    error_4 = _d.sent();
                    message = '新建失败';
                    if (error_4.errno === -4075) {
                        message = '文件已存在';
                    }
                    res.send({
                        message: message,
                        status: 'error',
                        error: error_4
                    });
                    return [3 /*break*/, 11];
                case 11: return [3 /*break*/, 13];
                case 12:
                    res.send({
                        message: '缺少file或isDirectory字段',
                        status: 'error'
                    });
                    _d.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    }); }
];
/**
 * 删除文件/目录
 * @param req request
 * @param res response
 */
function deleteFile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var relPath, filePath, file, error_5, error_6, error_7, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    relPath = getRelativePath(req.path);
                    filePath = path_1.default.resolve(rootDirPath, relPath);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, fsPromise_1.statPromise(filePath)];
                case 2:
                    file = _a.sent();
                    if (!file.isDirectory) return [3 /*break*/, 7];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, fsPromise_1.rmdirPromise(filePath)];
                case 4:
                    _a.sent();
                    res.send({
                        status: 'success'
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    throw error_5;
                case 6: return [3 /*break*/, 10];
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, fsPromise_1.unlinkPromise(filePath)];
                case 8:
                    _a.sent();
                    res.send({
                        status: 'success'
                    });
                    return [3 /*break*/, 10];
                case 9:
                    error_6 = _a.sent();
                    throw error_6;
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_7 = _a.sent();
                    message = '';
                    if (error_7.errno === -4058) {
                        message = '文件不存在';
                    }
                    if (error_7.errno === -4051) {
                        message = '不能删除非空目录';
                    }
                    res.send({
                        message: message,
                        error: error_7,
                        status: 'error'
                    });
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFile = deleteFile;
/**
 * 重命名文件/目录
 * @param req request
 * @param res response
 */
function put(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var relPath, filename, oldPath, _a, rename, pattern, newPath, error_8, message;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    relPath = getRelativePath(req.path);
                    filename = getFileName(req.path);
                    oldPath = path_1.default.resolve(rootDirPath, relPath);
                    _a = req.body.rename, rename = _a === void 0 ? '' : _a;
                    if (relPath === '') {
                        return [2 /*return*/, res.send({
                                message: '根目录不能修改',
                                status: 'error'
                            })];
                    }
                    if (!rename) {
                        return [2 /*return*/, res.send({
                                message: 'rename不能为空',
                                status: 'error'
                            })];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    pattern = new RegExp("[^/](" + filename + ")$");
                    newPath = oldPath.replace(pattern, function (match, $1) {
                        return match.replace($1, rename);
                    });
                    return [4 /*yield*/, fsPromise_1.renamePromise(oldPath, newPath)];
                case 2:
                    _b.sent();
                    res.send({
                        status: 'success'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _b.sent();
                    message = '';
                    if (error_8.errno === -4058) {
                        message = '文件不存在';
                    }
                    res.send({
                        message: message,
                        error: error_8,
                        status: 'error'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.put = put;
