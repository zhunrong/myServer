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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __importDefault(require("./model"));
var config_1 = __importDefault(require("../config"));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(options) {
        return _super.call(this, options) || this;
    }
    return User;
}(model_1.default));
exports.default = new User({
    host: config_1.default.DATABASE_HOST,
    user: config_1.default.USER,
    password: config_1.default.PASSWORD,
    database: 'zr_dev',
    table: 'user'
});
