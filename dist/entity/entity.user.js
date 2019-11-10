"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
        /**
         * 用户角色
         * 0 -> 管理员
         * 1 -> 普通用户
         */
        this.role = 1;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid', {
            name: 'id'
        }),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'password',
            nullable: false,
            type: 'varchar',
            length: 40
        }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'nickname',
            type: 'varchar',
            nullable: true,
            length: 20
        }),
        __metadata("design:type", String)
    ], User.prototype, "nickname", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'avatar',
            type: 'varchar',
            nullable: true,
            length: 100
        }),
        __metadata("design:type", String)
    ], User.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'email',
            type: 'varchar',
            nullable: false,
            length: 20
        }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({
            name: 'role',
            type: 'int',
            comment: '用户角色',
            nullable: false,
            default: 1
        }),
        __metadata("design:type", Number)
    ], User.prototype, "role", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({
            name: 'create_at'
        }),
        __metadata("design:type", Date)
    ], User.prototype, "createAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({
            name: 'update_at'
        }),
        __metadata("design:type", Date)
    ], User.prototype, "updateAt", void 0);
    User = __decorate([
        typeorm_1.Entity({
            name: 'user',
            engine: 'InnoDB',
            database: 'zr_dev'
        })
    ], User);
    return User;
}());
exports.User = User;
exports.default = User;
