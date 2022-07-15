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
const auth_guard_1 = require("../auth/auth.guard");
const banned_users_model_1 = require("../models/banned.users.model");
const roles_model_1 = require("../models/roles.model");
const user_model_1 = require("../models/user.model");
let UsersService = class UsersService {
    constructor(userModel, rolesRepository, bannedUsersRep) {
        this.userModel = userModel;
        this.rolesRepository = rolesRepository;
        this.bannedUsersRep = bannedUsersRep;
    }
    async getAllUsers() {
        return this.userModel.findAll({ include: { all: true } });
    }
    async createUser(userDto) {
        console.log(userDto);
        const candidate = await this.findUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('user with such email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.create(userDto);
        const defaultRole = await this.rolesRepository.findOne({
            where: { value: 'ADMIN' },
        });
        await user.$set('roles', defaultRole);
        user.roles = [defaultRole];
        return user;
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({ where: { email }, include: { all: true } });
    }
    async giveRole(giveDto) {
        const user = await this.userModel.findByPk(giveDto.userId);
        const roleToGive = await this.rolesRepository.findOne({
            where: { value: giveDto.role },
            include: { all: true },
        });
        if (roleToGive && user) {
            await user.$add('roles', roleToGive);
            return user;
        }
        throw new common_1.BadRequestException('wrong userId or role value');
    }
    async banUser(banDto) {
        return await this.bannedUsersRep.create(banDto);
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
    __param(2, (0, sequelize_1.InjectModel)(banned_users_model_1.BannedUsers)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map