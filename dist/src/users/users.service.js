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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const auth_guard_1 = require("src/auth/auth.guard");
const roles_model_1 = require("src/models/roles.model");
const user_model_1 = require("src/models/user.model");
let UsersService = class UsersService {
    constructor(userModel, rolesRepository) {
        this.userModel = userModel;
        this.rolesRepository = rolesRepository;
    }
    async getAllUsers() {
        return this.userModel.findAll({ include: { all: true } });
    }
    async createUser(userDto) {
        const candidate = await this.findUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('user with such email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.create(userDto);
        const defaultRole = await this.rolesRepository.findOne({
            where: { value: 'USER' },
        });
        await user.$set('roles', defaultRole);
        user.roles = [defaultRole];
        return user;
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({ where: { email } });
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "getAllUsers", null);
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(roles_model_1.Roles)),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map