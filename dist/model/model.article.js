"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var model_1 = __importDefault(require("./model"));
var config_1 = __importDefault(require("../config"));
var Article = /** @class */ (function (_super) {
    __extends(Article, _super);
    function Article(options) {
        var _this = _super.call(this, options) || this;
        _this.init();
        return _this;
    }
    Article.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query("\n      CREATE TABLE IF NOT EXISTS article (\n          id int(11) NOT NULL AUTO_INCREMENT,\n          uid int(11) NOT NULL,\n          title varchar(255) DEFAULT '',\n          markdown text,\n          html text,\n          create_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,\n          update_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n          PRIMARY KEY (id)\n        ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;\n    ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取文章列表(某个用户)
     * @param uid
     */
    Article.prototype.getArticles = function (uid) {
        var sql = "select \n                  id,\n                  uid,\n                  title,\n                  markdown,\n                  DATE_FORMAT(create_at,'%Y-%m-%d %h:%i:%s') as createTime,\n                  DATE_FORMAT(update_at,'%Y-%m-%d %h:%i:%s') as updateTime \n              from " + this.table + " ";
        if (uid) {
            sql += "where uid=" + uid;
        }
        return this.query(sql);
    };
    /**
     * 获取文章详情
     * @param uid
     * @param id
     */
    Article.prototype.getArticleDetail = function (id, uid) {
        var sql = "select\n                  id,\n                  uid,\n                  title,\n                  markdown,\n                  DATE_FORMAT(create_at,'%Y-%m-%d %h:%i:%s') as createTime,\n                  DATE_FORMAT(update_at,'%Y-%m-%d %h:%i:%s') as updateTime \n              from " + this.table + "\n              where \n                  id=" + id;
        return this.query(sql);
    };
    return Article;
}(model_1.default));
exports.default = new Article({
    host: config_1.default.DATABASE_HOST,
    user: config_1.default.USER,
    password: config_1.default.PASSWORD,
    database: 'zr_dev',
    table: 'article'
});
